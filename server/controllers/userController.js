const express = require("express");
const User = require("../models/User");
const router = express.Router();
const multer = require('multer')

//*************************************** */  

// MULTER setup for cloudinary
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const storageCloudinary = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Blinker',
    format: async (req, file) => {

        let extension = '';

        if (file.mimetype.includes('image')) {
            
            extension = file.mimetype.slice(6)
            
            if (extension === 'jpeg') extension = 'jpg';
        }
        
       return extension

    }, 
    public_id: (req, file) => `${req.body._id}-${Date.now()}-${file.originalname}`,
  },
});
 
const uploadCloudinary = multer({ storage: storageCloudinary });
//*************************************** */  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      
    cb(null, './server/uploads')
  },

  filename: function (req, file, cb) {
    
      console.log('inside storage: FILE is', file)

      let extension = '';

      if (file.mimetype.includes('image')) {
          
          extension = file.mimetype.slice(6)
          
          if (extension === 'jpeg') extension = 'jpg';
  
          const filename = `${new Date().toISOString()}-${file.originalname}.${extension}`
          console.log('filename is', filename)
          cb(null, filename)

      } else {
          cb('Not an image file')
      }


  },

})

const uploadAdvanced = multer({ storage: storage })

router.post("/register", async (req, res) => {
  try {
    console.log("req.body is", req.body);
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.send({ success: false, errorId: 1 });
    const newUser = new User(req.body);
    const user = await newUser.save();
    console.log("Register: user created is", user);
    res.send({ success: true });
  } catch (error) {
    console.log("Register ERROR:", error.message);
    res.send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("req.body is", req.body);

    const { email, pass, username } = req.body;

    // need to check if pass is missing or one of username and email
    // if email and password are missing then email || username = false.
    // then the opposite of false is true. if it's true then send that success = false
    if (!(email || username) || !pass)
      return res.send({ success: false, errorId: 1 });

    // if (!email && !username) //send success false
    // if (!pass) send success false

    // const user = User.findOne({email: email, pass: pass})
    const user = await User.findOne({
      $or: [{ email }, { username }],
       
    }).select("-__v");

    console.log("Login: user is", user);
    if (!user) return res.send({ success: false, errorId: 2 });

    const passMatch = await user.comparePassword(pass, user.password); 
    console.log(" passmatch is", passMatch);

    if (!passMatch) return res.send({ success: false, errorId: 3 }); // passwords don't match 

    res.send({ success: true, user });
  } catch (error) {
    console.log("Login ERROR:", error.message);
    res.send(error.message);
  }
});

router.patch('/profile', uploadCloudinary.single('image'), async (req, res) => {

  try {
      
      console.log('req.body is', req.body)
      console.log('req.file is', req.file)

      const {email, username, _id} = req.body

      if (!(email || username)) return res.send({success: false, errorId: 1})

      // req.body.image = req.file.filename
      if (req.file) req.body.image = req.file.path

      const user = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-__v -pass')

      console.log('Profile: user is', user)

      if (!user) return res.send({success: false, errorId: 2})

      res.send({success: true, user})
  } catch (error) {
      
      console.log('Register ERROR:', error.message)
      res.send(error.message)
  }
})

router.patch('/profilecloudinary', uploadCloudinary.single('image'), async (req, res) => {

  try {
      
      console.log('req.body CLOUDINARY is', req.body)
      console.log('req.file CLOUDINARY is', req.file)

      const {email, username, _id} = req.body

      if (!(email || username)) return res.send({success: false, errorId: 1})

      // const foundUser = await User.findById({_id})
      // 
      // update users (field1, field2) set field1 = email and field2 = username

      req.body.image = req.file.path

      const user = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-__v -pass')

      console.log('Profile: user CLOUDINARY is', user)

      if (!user) return res.send({success: false, errorId: 2})

      res.send({success: true, user})
  } catch (error) {
      
      console.log('Register CLOUDINARY ERROR:', error.message)
      res.send(error.message)
  }
})

module.exports = router;

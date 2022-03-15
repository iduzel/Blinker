const express = require("express");
const router = express.Router();
const Blink = require("../models/Blink");

router.get("/", (req, res) => {
  res.send("HELLO FROM BLINK CONTROLLER");
});

//ADD
router.post("/add", async (req, res) => {
  try {
    console.log("blinks/add body is", req.body);

    const newBlink = new Blink(req.body);

    // const post = await newPost.save()
    const blink = await newBlink
      .save()
      .then((item) =>
        item.populate({ path: "owner", select: "username email image" })
      );

    if (!blink) return res.send({ success: false, errorId: 2 });

    res.send({ success: true, blink });
  } catch (error) {
    console.log("Blinks add ERROR", error.message);
    res.send(error.message);
  }
});

//LIST
router.get("/list", async (req, res) => {
  try {
    const blinks = await Blink.find().limit(50).populate({
      path: "owner",
      select: "username email image",
    });

    res.send(blinks);
  } catch (error) {
    console.log("Blinks list ERROR", error.message);
    res.send(error.message);
  }
});

// DELETE

// Delete user from DB
router.delete('/delete', async (req, res) => {

  console.log('Add blink query is', req.query)
  try {

      const deletedBlink = await Blink.findByIdAndDelete(req.query.id)

      console.log('deleted blink is',deletedBlink)

      if (!deletedBlink) return res.send({success: false, errorId: 2})


      res.send({success: true})
      // res.send({success: true, user})
      
  } catch (error) {
      
      console.log('Delete blink ERROR:', error.message)
      res.send(error.message)
  }
})




router.put('/likeadd/:postid/:userid', async (req, res) => {

  try {
      
      console.log('likeadd post id is', req.params.postid)
      console.log('likeadd user id is', req.params.userid)
      
      const {userid, postid} = req.params;

      // 1. get the post
      const postToUpdate = await Blink.findById(postid)
      console.log('post to update BEFORE is', postToUpdate)


      // 2. update the likes array

      console.log('post to update is', postToUpdate)
      
      const idx = postToUpdate.likes.findIndex(item => item == userid)
      
      console.log('idx IS', idx)
      // check if user is in the likes array
      if (idx > -1) { // -1 means that user not found in the array
          // if yes, then remove him
          postToUpdate.likes.splice(idx, 1);
      } else {
          // if no then add him
          postToUpdate.likes.push(userid)
      }

      // 3. update the post in the DB

      // const post = await Post.findByIdAndUpdate(postid, postToUpdate)
      const post = await postToUpdate.save()
    
      console.log('post is', post)
      res.send({success: true, post})

  } catch (error) {
      
      console.log('Like add ERROR', error. message)
      res.send(error. message)
  }
})


module.exports = router;

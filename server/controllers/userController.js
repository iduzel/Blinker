const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HELLO UUUSSSEEERRR");
});
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

module.exports = router;

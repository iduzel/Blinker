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
        item.populate({ path: "owner", select: "username email" })
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
      select: "username email",
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

  console.log('Add blink qurey is', req.query)
  try {

      const deletedBlink = await Blink.findByIdAndDelete(req.query.id)

      console.log('deleted blink is',deletedBlink)

      if (!deletedBlink) return res.send({success: false, errorId: 2})


      res.send({success: true})
      // res.send({success: true, user})
      
  } catch (error) {
      
      console.log('Delete user ERROR:', error.message)
      res.send(error.message)
  }
})

module.exports = router;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlinkSchema = new Schema({

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },


  text: {
    type: String,
  },



});

module.exports = mongoose.model("Blink", BlinkSchema);

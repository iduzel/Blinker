const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlinkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
  },
});

module.exports = mongoose.model("Blink", BlinkSchema);

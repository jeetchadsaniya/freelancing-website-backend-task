const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      enum: ['admin', 'client', 'freelancer'],
      require : true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user",userSchema);

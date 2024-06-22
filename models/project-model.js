const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number, 
        required: true,
      },
      tags: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'tag',
          required: true
        }
      ],
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
      assignTo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
      },
      status: {
        type: String,
        enum: ['notAssigned', 'inProcess', 'complete'],
        default: 'notAssigned',
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("project",projectSchema);

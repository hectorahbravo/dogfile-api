const mongoose = require("mongoose");

const reminderSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Required field"],
    },
    type: {
      type: [String],
      enum: ["tipo1", "tipo2", "tipo3", "other"],
      required: [true, "Required field"],
    },
    icon: {
      type: String,
      enum: ["icon1", "icon2", "icon3", "icon4"],
      required: [true, "Required field"],
    },
    photo: {
      type: String,
    },
    repeat: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: String,
      enum: ["daily", "monthly", "annually", ""],
    },
    date: {
      type: String,
    },

    hour: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder;

const mongoose = require("mongoose");

const reminderSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Required field"],
    },
    type: {
      type: [String],
      enum: [
        "Medicamentos",
        "Vacuna",
        "Visita al veterinario",
        "Pastillas antiparacitarias",
        "Pipeta antiparacitaria",
        "Collar antiparacitario",
        "Baño",
        "Peluqueria",
        "Vacuna polivalente rabia",
        "Otros",
      ],
      required: [true, "Required field"],
    },
    icon: {
      type: String,
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
      enum: ["daily", "monthly", "weekly", "annually", "", "none"],
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },

    hour: {
      type: String,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Required field"],
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

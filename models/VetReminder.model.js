const mongoose = require("mongoose");

const vetReminderSchema = mongoose.Schema(
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
        "Pastillas antiparásitarias",
        "Pipeta antiparásitaria",
        "Collar antiparásitario",
        "Baño",
        "Peluquería",
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
    vet: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Vet",
      required: [true, "Required field"],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Required field"],
    },
    destinatary: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Required field"],
    }],
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

const VetReminder = mongoose.model("VetReminder", vetReminderSchema);
module.exports = VetReminder;

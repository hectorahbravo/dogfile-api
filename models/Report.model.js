const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    startDate: {
      type: Date,
      required: [true, "La fecha de inicio es obligatoria"],
    },
    endDate: {
      type: Date,
      required: [true, "La fecha de fin es obligatoria"],
    },
    time: {
      type: String,
      required: [true, "La hora es obligatoria"],
    },
    location: {
      type: String,
      required: [true, "El lugar es obligatorio"],
    },
    latitude: {
      type: Number,
      required: [true, "La latitud es obligatoria"],
    },
    longitude: {
      type: Number,
      required: [true, "La longitud es obligatoria"],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Required field"],
    },
    type: {
      type: String,
      default: "report",
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

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;

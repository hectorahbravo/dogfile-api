const mongoose = require("mongoose");

const recommendationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
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
    image: {
        type: String,
        default: "https://images.freeimages.com/image/previews/c2f/nature-tree-flat-vector-png-5690469.png",
    }
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

const Recommendation = mongoose.model("Recommendation", recommendationSchema);
module.exports = Recommendation;

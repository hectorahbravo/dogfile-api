const mongoose = require("mongoose");

const dogSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required field"],
    },
    birthdate: {
      type: Date,
    },
    weight: {
      type: String,
      required: [true, "Required field"],
    },
    vaccines: {
      type: String,
      enum: ["vaccine1", "vaccine2", "vaccine3"],
    },
    allergies: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/flat-design-dachshund-silhouette-illustration_23-2150366733.jpg?w=740&t=st=1708372816~exp=1708373416~hmac=d153be183c4b21136d101fc5dd6a3176fefbce404f2bd3c0e2ff4d7c35100b82",
    },
    foodType: {
      type: String,
    },
    foodTimes: {
      type: String
    },
    foodKg: {
      type: String
    },
    temperament: {
      type: String,
      enum: ["Estable", "Miedoso", "Reactivo"]
    },
    owner: {
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

const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;

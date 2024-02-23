const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ROUNDS = 10;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Required field"],
      trim: true, // para borrar espacios blancos innecesarios al principio o final de la palabra
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Required field"],
      match: [EMAIL_REGEX, "Add a valid email"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "required field"],
      minlength: [8, "invalid length"],
    },
    dogs: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Dogs",
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1708372445~exp=1708373045~hmac=33d3a3c8a115dda681ea42275ad3fe94ddad18dcb8ca4a63bf0bcae88618e162",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);
// Crear el metodo para comparar contraseñas

userSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

// Presave para guardar la contraseña hasheada

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
    // .catch(err => next(err))
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

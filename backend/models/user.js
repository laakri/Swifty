const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const enumValues = require("mongoose-enumvalues");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenum: { type: String, default: "None" },
    imgPath: { type: String, default: "../../assets/deafault-profile-pic.png" },
    email: { type: String, default: "None" },
    location: { type: String, default: "None" },
    verified: { type: String, default: "false" },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    roles: {
      type: [
        {
          type: String,
          enum: ["user", "admin"],
        },
      ],
      default: "user",
    },
  },
  { timestamps: true }
);

const enumOptions = {};

userSchema.plugin(enumValues, enumOptions);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

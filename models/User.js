const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Enter a valid email address"],
  },
  thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: "thought",
    },
  ]
});

const User = model("User", UserSchema);

module.exports = User;
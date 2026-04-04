const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    careerGoal: { type: String, required: true },
    skills: [
      {
        skillName: { type: String },
        level: { type: String, default: "Beginner" },
        score: { type: Number, default: 0 },
      },
    ],
    theme: { type: String, default: "light" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
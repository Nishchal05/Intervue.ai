const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: String,
});

const SingleInterviewSchema = new mongoose.Schema({
  domain: String,
  questions: [QuestionSchema],
  createdAt: Date,
  linkExpiry: Date,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  interviews: {
    totalCreated: { type: Number, default: 0 },
    interviewData: {
      type: Map,
      of: SingleInterviewSchema,
      default: {},
    },
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

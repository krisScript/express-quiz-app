const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  quizScore: {
    type: Number,
    default: 0
  }
});
UserSchema.methods.updateScore = newScore => {
  if (newScore > this.quizScore) {
    this.quizScore = newScore;
    return this.save();
  }
};
const User = mongoose.model('User', UserSchema);

module.exports = User;

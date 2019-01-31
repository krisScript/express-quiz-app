const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
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
    default: 0,
  }
});
userSchema.methods.updateScore  = function(newScore){
  if (newScore > this.quizScore) {
    this.quizScore = newScore;
    return this.save();
  }
};

module.exports =  mongoose.model('User', userSchema);

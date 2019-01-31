const getData = require('../util/getData');
const User = require('../models/user')
exports.getNewQuiz = async (req, res, next) => {
  const apiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
  try {
    const data = await getData(apiUrl);
    const questions = data.results.map(question => {
      const answers = [question.correct_answer].concat(
        question.incorrect_answers
      );
      question['answers'] = answers;
      return question;
    });
    res.render('quiz/quiz', {
      user: req.user,
      title: 'quiz',
      path: '/new-quiz',
      questions
    });
  } catch (error) {
    console.log(error);
  }
};
exports.postQuizResults = async (req, res, next) => {
  try{
    const rawResults = Object.entries(req.body).filter(entry => {
      return (
        typeof entry[1] === 'string' &&
        entry[1] !== '' &&
        entry[0] !== '_csrf' &&
        entry[0] !== 'number_questions'
      );
    });
    const resultLength = 3;
    const chunkedResults = [];
    rawResults.forEach(val => {
      const last = chunkedResults[chunkedResults.length - 1];
      if (!last || last.length === resultLength) {
        chunkedResults.push([val]);
      } else {
        last.push(val);
      }
    });
  
    const refinedResults = chunkedResults.map(result => {
      return {
        question: result[0][1],
        correct_answer: result[1][1],
        answer: result[2][1]
      };
    });
    const correctAnswers = refinedResults.filter(result => {
      return result.correct_answer === result.answer
    })
    const correctAnswersNum = correctAnswers.length
    let incorrectAnswersNum = refinedResults.length - correctAnswersNum
    const user  = await User.findOne({email:req.user.email})
    await user.updateScore(correctAnswersNum)
    res.render('quiz/quiz-results', {
      user: req.user,
      title: 'Quiz Results',
      path: '/quiz-results',
      results:refinedResults,
      correctAnswersNum,
      incorrectAnswersNum
    });
  }catch(error){
    console.log(error)
  }
  
};

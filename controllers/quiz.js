const getData = require('../util/getData');
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
exports.postQuizResults = (req,res,next) => {
    console.log(req.body)
}
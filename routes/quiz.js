const { ensureAuthenticated } = require('../config/auth');
const express = require('express')
const router = express.Router();


const quizController  = require('../controllers/quiz')
router.get('/new-quiz',ensureAuthenticated, quizController.getNewQuiz);

router.post('/quiz-results',ensureAuthenticated,quizController.postQuizResults)
module.exports = router;

const Router = require('express').Router();
const controllers  = require('../controllers/postgresqlcontroller.js');

Router.get('/questions', controllers.getQuestions)
Router.get('/questions/:question_id/answers', controllers.getAnswers)
Router.post('/questions', controllers.postQuestions)
Router.post('/questions/:question_id/answers', controllers.postAnswers)
Router.put('/questions/:question_id/helpful', controllers.putQuestions)
Router.put('/questions/:question_id/report', controllers.putQuestions)
Router.put('/answers/:answer_id/helpful', controllers.putAnswers)
Router.put('/answers/:answer_id/report', controllers.putAnswers)

module.exports = Router;
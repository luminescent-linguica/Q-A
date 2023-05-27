const postgresqlModel = require('../models/postgresqlModel.js');

// postgresqlModel.connectPgDatabase();


module.exports = {
  getQuestions: (req, res) => {
    const params = {
      product_id: req.query.product_id,
      page: 1,
      count: 5
    }
    postgresqlModel.getQuestions(params)
      .then((result) => {
        const obj = {};
        obj.product = params.product_id;
        obj.results = result.rows;
        res.status(200).send(obj)
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500)
      })
  },

  getAnswers: (req, res) => {
    const params = {
      question_id: req.query.question_id,
      page: 1,
      count: 5
    }
  },

  postQuestions: (req, res) => {
    const params = {
      body: req.query.body,
      name: req.query.name,
      email: req.query.email,
      product_id: req.query.product_id
    }
  },

  postAnswers: (req, res) => {
    const params = {
      question_id: req.query.question_id,
      body: req.query.body,
      name: req.query.name,
      email: req.query.name,
      photos: req.query.photos
    }
  },

  putQuestions: (req, res) => {
    const params = {
      question_id: req.query.question_id
    }
  },

  putAnswers: (req, res) => {
    const params = {
      answer_id: req.query.question_id
    }
  }
}
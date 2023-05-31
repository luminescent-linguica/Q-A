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
        console.log('Get Questions got called')
        const obj = {};
        obj.product_id = params.product_id;
        obj.results = result.rows;
        res.status(200).send(obj)
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500)
      })
  },

  getAnswers: (req, res) => {
    console.log('This is the req', req)
    const params = {
      question_id: req.params.question_id,
      page: req.params.page ? req.params.page : 1,
      count: req.params.count ? req.params.count : 5
    }
    postgresqlModel.getAnswers(params)
      .then((result) => {
        console.log('Get Answers got called', params)
        const obj = {};
        obj.question = params.question_id;
        obj.page = params.page;
        obj.count = params.count;
        obj.results = result.rows;
        res.status(200).send(obj)
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500)
      })
  },

  postQuestions: (req, res) => {
    const params = {
      body: req.query.body,
      name: req.query.name,
      email: req.query.email,
      product_id: req.query.product_id
    }
    postgresqlModel.postQuestions(params)
      .then((result) => {
        res.status(201).send('CREATED')
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500)
      })
  },

  postAnswers: (req, res) => {
    const params = {
      question_id: req.query.question_id,
      body: req.query.body,
      name: req.query.name,
      email: req.query.name,
      photos: req.query.photos
    }
    postgresqlModel.postAnswers(params)
      .then((result) => {
        res.status(201).send('CREATED')
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500)
      })
  },

  putQuestions: (req, res) => {
    const params = {
      question_id: req.query.question_id
    }
    postgresqlModel.putQuestions(params)
      .then((result) => {
        res.status(204).send('NO CONTENT')
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500)
      })
  },

  putAnswers: (req, res) => {
    const params = {
      answer_id: req.query.answer_id
    }
    postgresqlModel.putAnswers(params)
      .then((result) => {
        res.status(204).send('NO CONTENT')
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500)
      })
  }
}
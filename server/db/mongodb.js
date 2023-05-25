const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongodbForQA', { useNewUrlParser: true, useUnifiedTopology: true });

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  product_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number,
});

const answerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
});

const answerPhotoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true},
  answer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer'},
  url: String,
});

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
const Answer_Photo = mongoose.model('Answer_Photo', answerPhotoSchema);

module.exports = {
  Question,
  Answer,
  Answer_Photo
};
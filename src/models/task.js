// Design schema of our data

const moongose = require('mongoose');
const { Schema } = moongose;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = moongose.model('Task', TaskSchema);

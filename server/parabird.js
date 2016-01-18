/**
 * Created by liekkas on 15/12/30.
 */
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const ParabirdSchema = new Schema({
  name: String,
  config: Object,
});

module.exports = mongoose.model('ParaBird', ParabirdSchema);

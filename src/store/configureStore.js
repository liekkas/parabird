/**
 * Created by liekkas on 15/12/17.
 */
if (process.env.NODE_ENV === 'production') {
  console.log('>>> prod');
  //module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}

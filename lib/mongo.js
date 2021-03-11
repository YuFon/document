const mongoose = require('mongoose');
const config = require('config-lite')(__dirname)

console.log(config)

mongoose.connect(config.mongodb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});
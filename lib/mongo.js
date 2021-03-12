const mongoose = require('mongoose');
const config = require('config-lite')(__dirname)
const Schema = mongoose.Schema;

mongoose.connect(config.mongodb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

const NovelSchema = new Schema({
    name: String,
    novelMenuAdress: [{url: String, source: String}],
    createTime: {type: Date, default: Date.now()}
})
const NovelData = mongoose.model('NovelData', NovelSchema)

module.exports = {
    NovelData
}
const mongoose = require('mongoose');
const config = require('config-lite')(__dirname)

mongoose.connect(config.mongodb, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.loge(err)
    return
  }
  console.log('数据库链接成功')
});

module.exports = mongoose

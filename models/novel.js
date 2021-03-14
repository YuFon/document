const mongoose = require('../helpers/mongo')
console.log(mongoose)
const NovelSchema = new mongoose.Schema({
    name: String,
    address: {
        type: String,
        require: true,
        set(params) {
            if (/(http|https):\/\/([\w.]+\/?)\S*/.test(params)) {
                return params
            }
            else {
                return `https://${params}`
            }
        }
    },
    source: {
        type: String,
        trim: true
    },
    contentType: String
})
NovelSchema.statics.updateBookSync = function(name, source, searchResult, cb) {
    this.findOneAndUpdate({ name: new RegExp(name, 'i'), source}, searchResult, {upsert: true, new: true, useFindAndModify: true}, (err, docs) => {
        if (typeof cb === 'function') {
            cb(err, docs)
            return
        }
        console.log(err,docs)
    })
}


const NovelModal = mongoose.model('NovelList', NovelSchema)
module.exports = NovelModal
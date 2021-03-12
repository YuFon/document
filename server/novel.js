const { api } = require('../helpers/request')
const { baseURL } = require('../common/constant')
const cheerio = require('cheerio')
const querystring = require('querystring');
const novelModel = require('../models/novel')

class SearchResult {
    constructor(name, url, source) {
        this.name = name
        this.url = url
        this.source = source
    }
}
class Novel {
    constructor() {}

    async searchAll(name) {
        const bookList = []
        const query = {
            searchkey: name
        }
        const qureyArr = []
        for (const item of baseURL) {
            qureyArr.push(api.novel[item.shortName].search(querystring.stringify(query)))
        }
        await Promise.all(qureyArr).then(res => {
            for (const key in res) {
                if (res[key] && res[key].data) {
                    try {
                        const $ = cheerio.load(res[key].data)
                        const info = $(baseURL[key].key).find('a')[0]
                        console.log(info, baseURL[key].key)
                        if ($(info).attr('href')) {
                            const searchResult = new SearchResult($(info).text(), $(info).attr('href'), baseURL[key].name)
                            novelModel.addBook(searchResult)
                            bookList.push(searchResult)
                        }
                    }catch (err) {console.log(err)}
                }
            }
        })
        return bookList
    }
}

module.exports = Novel
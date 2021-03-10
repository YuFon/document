const { api } = require('../helpers/request')
const cheerio = require('cheerio')
const querystring = require('querystring');

class SearchResult {
    constructor(name, url, source) {
        this.name = name
        this.url = url
        this.source = source
    }
}
class Novel {
    constructor() {}

    async search(name) {
        const novelName = encodeURIComponent(name)
        const bookList = []
        const query = {
            type: 'articlename',
            q: encodeURIComponent(name)
        }
        const result = await api.novel.search.biquge(querystring.stringify(query))
        if (result.data) {
            try {
                const $ = cheerio.load(result.data)
                const info = $('.case_name').contents()
                console.log(result.data)
                console.log(info.length,1111111)
                if (info.length > 0 && info[1]) {
                    bookList.push(new SearchResult(info[1].text, info[1].href, encodeURIComponent('笔趣阁')))
                }
            } catch(err) {
                console.log(3333)
                console.log(err)
                return err
            }
        }
        return bookList
    }
}

module.exports = Novel
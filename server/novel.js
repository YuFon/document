const { api } = require('../helpers/request')
const { baseURL } = require('../common/constant')
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

    async searchAll(name) {
        const bookList = []
        const query = {
            searchkey: name
        }
        for (const key in baseURL) {
            let result
            try {
                result = await api.novel[key].search(querystring.stringify(query))
            } catch(err) {
                console.log(err)
            }
            if (result && result.data) {
                try {
                    const $ = cheerio.load(result.data)
                    const info = $(baseURL[key].key).find('a')[0]
                    if ($(info).attr('href')) bookList.push(new SearchResult($(info).text(), $(info).attr('href'), baseURL[key].name))
                } catch(err) {
                    // console.log(err)
                    return err
                }
            }
        }

        return bookList
    }
}

module.exports = Novel
const { api, request } = require('../helpers/request')
const { baseURL } = require('../common/constant')
const cheerio = require('cheerio')
const querystring = require('querystring');
const NovelModal = require('../models/novel');

class Novel {
    constructor() {}

    async searchAll(name) {
        class SearchResult {
            constructor(name, address, source, displaySource, contentType) {
                this.name = name
                this.address = address
                this.source = source,
                this.displaySource = displaySource,
                this.contentType = contentType
            }
        }

        const bookList = []
        const query = {
            searchkey: name
        }
        const queryList = []
        for (const item of baseURL) {
            queryList.push(api.novel[item.shortName].search(querystring.stringify(query)))
        }
        await Promise.all(queryList).then(async res => {
            for (const key in res) {
                if (res[key] && res[key].data) {
                    try {
                        const $ = cheerio.load(res[key].data)
                        const info = $(baseURL[key].key).find('a')[0]
                        let url = $(info).attr('href')
                        if (url) {
                            url = baseURL[key].shortName === 'biquge' ? url.replace('book/', '') : url
                            const searchResult = new SearchResult($(info).text(), `${baseURL[key].url}${url}`, baseURL[key].shortName, baseURL[key].name)
                            //  new NovelModal(searchResult).save()
                            searchResult.contentType = baseURL[key].contentType
                            NovelModal.updateBookSync(name, baseURL[key].shortName, searchResult)
                            bookList.push(searchResult)
                        }
                    }catch (err) {console.log(err)}
                }
            }
        })
        return bookList
    }

    async getMenu(name, source) {
        let novelInfo
        const menuList = []
        const fliter = {
            name: new RegExp(name)
        }
        if (source) fliter.source = source
        try {
            novelInfo = await NovelModal.find(fliter)
            const result = await request(novelInfo[0].address, novelInfo[0].contentType)('get')
            const $ = cheerio.load(result.data)
            const menuKey = baseURL.find(item => item.source === source ).menuKey || ''
            const menu = $(menuKey)
            console.log(menu)
            for (item of menu) {
                menuList.push({
                    name: $(item).text(),
                    address: $(item).attr('href')
                })
            }
        } catch (err) {
            console.log(err)
        }
        return menuList
    }
}

module.exports = Novel
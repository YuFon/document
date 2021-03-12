const { NovelData } = require('../lib/mongo')
const novelData = new NovelData()
const novelModel = {
    async addBook(data) {
        await novelData.save({
            name: data.name,
            novelMenuAdress: {
                url: data.url,
                source: data.source
            }
        })
    }
}

module.exports = novelModel
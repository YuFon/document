const express = require('express')
const router = express.Router()
const Novel = require('../server/novel')

const novelServer = new Novel()
router.get('/search/:name', async (req, res) => {
    const { name } = req.params;
    const result = await novelServer.search(name)
    res.send(result)
})


module.exports = router

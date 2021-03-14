const express = require('express')
const router = express.Router()
const Novel = require('../server/novel')

const novelServer = new Novel()
router.get('/searchAll/:name', async (req, res) => {
    const { name } = req.params;
    const result = await novelServer.searchAll(name)
    res.send(result)
})
router.get('/getMenu/:name', async (req, res) => {
    const { name } = req.params;
    const result = await novelServer.getMenu(name)
    res.send(result)
})

module.exports = router

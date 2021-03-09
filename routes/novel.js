const express = require('express')
const router = express.Router()

router.get('/get/:name', (req, res) => {
    const name = req.params.name;
    console.log(name)
    res.send('query is ' + name)
})

module.exports = router

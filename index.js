const express = require('express')
const routes = require('./routes')
const app = express()
console.log(routes)
app.use('/novel', routes.novel)

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})

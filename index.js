const express = require('express')
const routes = require('./routes')
const app = express()

app.use('/novel', routes.novel)
app.use('/document', routes.documents)

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})

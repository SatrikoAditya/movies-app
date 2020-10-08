const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001
require('./config/mongo')
const router = require('./routers/')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
    console.log(`service movies running on port ${PORT}`)
})
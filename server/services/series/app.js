const express = require('express')
const app = express()
const PORT = process.env.PORT || 5002
require('./config/mongo')
const router = require('./routers/')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
    console.log(`service tv series running on port ${PORT}`)
})
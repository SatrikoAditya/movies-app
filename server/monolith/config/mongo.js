const {MongoClient} = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true, useNewUrlParser: true})

const connect = async () => await client.connect()
connect()

const db = client.db('entertainMe')

module.exports = db

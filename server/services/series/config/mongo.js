const {MongoClient} = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true})

const connect = async () => await client.connect()
connect()

const db = client.db('entertainMe')

module.exports = db
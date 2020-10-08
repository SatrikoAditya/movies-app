const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = class TvSeries {
    static async findSeries(req, res) {
        try {
            const seriesCache = await redis.get('seriesCache')
            if(seriesCache) {
                res.json(JSON.parse(seriesCache))
            } else {
                const {data} = await axios.get('http://localhost:3002')
                await redis.set('seriesCache', JSON.stringify(data))
                res.json(data)
            }
        } catch(err) {
            console.log(err)
        }
    }
    static async addSeries(req, res) {
        try {
            const {title, overview, poster_path, popularity, tags } = req.body
            const {data} = await axios.post('http://localhost:3002', {
                title, overview, poster_path, popularity, tags
            })
            redis.del('seriesCache')
            res.json(data)
        } catch(err) {
            console.log(err)
        }
    }
    static async deleteSeries(req, res) {
        try {
            const id = req.params.id
            const {data} = await axios.delete(`http://localhost:3002/${id}`)
            redis.del('seriesCache')
            res.send(data)
        } catch(err) {
            console.log(err)
        }
    }
    static async updateSeries(req, res) {
        try {
            const id = req.params.id
            const {title, overview, poster_path, popularity, tags } = req.body
            const {data} = await  axios.put(`http://localhost:3002/${id}`, {
                title, overview, poster_path, popularity, tags
            })
            redis.del('seriesCache')
            res.send(data)
        } catch(err) {
            console.log(err)
        }
    }
    static async findOneSeries(req, res) {
        try {
            const id = req.params.id
            const {data} = await axios.get(`http://localhost:3002/${id}`)
            res.json(data)
        } catch(err) {
            console.log(err)
        }
    }
}
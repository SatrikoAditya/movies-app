const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = class EntertainMe {
    static async findAll(req, res) {
        try {
            const entertainMeCache = await redis.get('entertainMe')
            if(entertainMeCache) {
                res.json(JSON.parse(entertainMeCache))
            } else {
                let all = {}
                const movies = await axios.get('http://localhost:3001')
                all.movies = movies.data
                const series = await axios.get('http://localhost:3002')
                all.series = series.data
                await redis.set('entertainMe', JSON.stringify(all))
                res.json(all)
            }
        }catch(err) {
            console.log(err)
        }
    }
}
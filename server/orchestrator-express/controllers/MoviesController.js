const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
 
module.exports = class MoviesController {
    static async findMovies(req, res) {
        try {
            const moviesCache = await redis.get('moviesCache')
            if(moviesCache) {
                res.json(JSON.parse(moviesCache))
            } else {
                const {data} = await axios.get('http://localhost:5001')
                await redis.set('moviesCache', JSON.stringify(data))
                res.json(data)
            }
        } catch(err) {
            console.log(err)
        }
    }
    static async addMovie(req, res) {
        try {
            const {title, overview, poster_path, popularity, tags } = req.body
            const {data} = await axios.post('http://localhost:5001', {
                title, overview, poster_path, popularity, tags
            })
            await redis.del('moviesCache')
            res.json(data)
        } catch(err) {
            console.log(err)
        }
    }
    static async deleteMovie(req, res) {
        try {
            const id = req.params.id
            const {data} = await axios.delete(`http://localhost:5001/${id}`)
            await redis.del('moviesCache')
            res.send(data)
        } catch(err) {
            console.log(err)
        }
    }
    static async updateMovie(req, res) {
        try {
            const id = req.params.id
            const {title, overview, poster_path, popularity, tags } = req.body
            const {data} = await axios.put(`http://localhost:5001/${id}`, {
                title, overview, poster_path, popularity, tags
            })
            await redis.del('moviesCache')
            res.send(data)
        } catch(err) {
            console.log(err)
        }
    }
    static async findOneMovie(req, res) {
        try {
            const id = req.params.id
            const {data} = await axios.get(`http://localhost:5001/${id}`)
            res.json(data)
        } catch(err) {
            console.log(err)
        }
    }
}
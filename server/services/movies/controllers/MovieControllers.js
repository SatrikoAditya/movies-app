const Movie = require('../models/movies')

module.exports =  class MoviesController {
    static findAll(req, res) {
        Movie.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static create(req, res) {
        const {title, overview, poster_path, popularity, tags} = req.body
        const newData = {title, overview, poster_path, popularity, tags}
        Movie.insert(newData)
        .then(data => {
            res.json(data.ops[0])
        })
        .catch(err => {
            console.log(err)
        })
    }
    static delete(req, res) {
        const id = req.params.id
        let data = {}
        Movie.delete(id)
        .then(result => {
            data.result = 'Berhasil Delete'
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static update(req, res) {
        const id = req.params.id
        const data = {}
        Movie.findOne(id)
        .then(data => {
            const title = req.body.title || data.title
            const overview = req.body.overview || data.overview
            const poster_path = req.body.poster_path || data.poster_path
            const popularity = req.body.popularity || data.popularity
            const tags = req.body.tags || data.tags
            const updateData = {id, title, overview, poster_path, popularity, tags}
            return Movie.update(updateData)
        })
        .then(result => {
            data.result = 'Berhasil Update'
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static findOne(req, res) {
        const id = req.params.id
        Movie.findOne(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
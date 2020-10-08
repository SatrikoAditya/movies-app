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
        Movie.delete(id)
        .then(data => {
            res.json('Berhasil Delete')
        })
        .catch(err => {
            console.log(err)
        })
    }
    static update(req, res) {
        const id = req.params.id
        const {title, overview, poster_path, popularity, tags} = req.body
        const updateData = {id, title, overview, poster_path, popularity, tags}
        Movie.update(updateData)
        .then(data => {
            res.json('Berhasil Update')
        })
        .catch(err => {
            console.log(err)
        })
    }
}
const axios = require('axios')

module.exports = class MoviesController {
    static findMovies(req, res) {
        axios.get('http://localhost:3001')
        .then(({data}) => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static addMovie(req, res) {
        const {title, overview, poster_path, popularity, tags } = req.body
        axios.post('http://localhost:3001', {
            title, overview, poster_path, popularity, tags
        })
        .then(({data}) => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static deleteMovie(req, res) {
        const id = req.params.id
        axios.delete(`http://localhost:3001/${id}`)
        .then(({data}) => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static updateMovie(req, res) {
        const id = req.params.id
        const {title, overview, poster_path, popularity, tags } = req.body
        axios.put(`http://localhost:3001/${id}`, {
            title, overview, poster_path, popularity, tags
        })
        .then(({data}) => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static findOneMovie(req, res) {
        const id = req.params.id
        axios.get(`http://localhost:3001/${id}`)
        .then(({data}) => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
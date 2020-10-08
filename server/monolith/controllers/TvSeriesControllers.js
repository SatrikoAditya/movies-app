const TvSerie = require('../models/tvseries')

module.exports =  class TvSeriesController {
    static findAll(req, res) {
        TvSerie.find()
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
        TvSerie.insert(newData)
        .then(data => {
            res.json(data.ops[0])
        })
        .catch(err => {
            console.log(err)
        })
    }
    static delete(req, res) {
        const id = req.params.id
        TvSerie.delete(id)
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
        TvSerie.update(updateData)
        .then(data => {
            res.json('Berhasil Update')
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
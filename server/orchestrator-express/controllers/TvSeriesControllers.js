const axios = require('axios')

module.exports = class TvSeries {
    static findSeries(req, res) {
        axios.get('http://localhost:3002')
        .then(({data}) => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static addSeries(req, res) {
        const {title, overview, poster_path, popularity, tags } = req.body
        axios.post('http://localhost:3002', {
            title, overview, poster_path, popularity, tags
        })
        .then(({data}) => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static deleteSeries(req, res) {
        const id = req.params.id
        axios.delete(`http://localhost:3002/${id}`)
        .then(({data}) => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static updateSeries(req, res) {
        const id = req.params.id
        const {title, overview, poster_path, popularity, tags } = req.body
        axios.put(`http://localhost:3002/${id}`, {
            title, overview, poster_path, popularity, tags
        })
        .then(({data}) => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static findOneSeries(req, res) {
        const id = req.params.id
        axios.get(`http://localhost:3002/${id}`)
        .then(({data}) => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
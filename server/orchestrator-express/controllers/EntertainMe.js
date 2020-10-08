const axios = require('axios')

module.exports = class EntertainMe {
    static findAll(req, res) {
        let all = {}
        axios.get('http://localhost:3001')
        .then(({data}) => {
            all.movies = data
            return axios.get('http://localhost:3002')
        })
        .then(({data}) => {
            all.series = data
            res.json(all)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
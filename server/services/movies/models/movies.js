const {ObjectId} = require('mongodb')
const db = require('../config/mongo')
const Movies = db.collection('movies')

module.exports =  class Movie {
    static find() {
        return Movies.find().toArray()
    }
    static insert(newData) {
        return Movies.insertOne(newData)
    }
    static delete(id) {
        return Movies.deleteOne({_id: ObjectId(id)})
    }
    static update(data) {
        return Movies.updateOne({_id : ObjectId(data.id)}, {$set: {
            "title": data.title,
            "overview": data.overview,
            "poster_path": data.poster_path,
            "popularity": data.popularity,
            "tags": data.tags
        }})
    }
    static findOne(id) {
        return Movies.findOne({_id: ObjectId(id)})
    }
}
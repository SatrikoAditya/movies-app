const {ObjectId} = require('mongodb')
const db = require('../config/mongo')
const TvSeries = db.collection('tvSeries')

module.exports =  class Tvserie {
    static find() {
        return TvSeries.find().toArray()
    }
    static insert(newData) {
        return TvSeries.insertOne(newData)
    }
    static delete(id) {
        return TvSeries.deleteOne({_id: ObjectId(id)})
    }
    static update(data) {
        return TvSeries.updateOne({_id : ObjectId(data.id)}, {$set: {
            "title": data.title,
            "overview": data.overview,
            "poster_path": data.poster_path,
            "popularity": data.popularity,
            "tags": data.tags
        }})
    }
    static findOne(id) {
        return TvSeries.findOne({_id: ObjectId(id)})
    }
}

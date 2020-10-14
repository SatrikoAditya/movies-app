const {ApolloServer, gql, UserInputError} = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const PORT = 5000

const typeDefs = gql`
    type Movie {
        _id: ID!
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String]!
    }

    type Serie {
        _id: ID!
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String]!
    }

    type Delete {
        result : String
    }

    type Update {
        result : String
    }

    type Query {
        movies: [Movie]
        movieById(id: String): Movie
        series: [Serie]
        serieById(id: String): Serie
    }

    type Mutation {
        addMovie(title: String!, overview: String!, poster_path: String!, popularity: Float!, tags: [String]!): Movie
        addSerie(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Serie
        deleteMovie(id: String): Delete
        deleteSerie(id: String): Delete
        updateMovie(id: String, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Update
        updateSerie(id: String, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Update
    }
`;
 
const resolvers = {
    Query: {
        movies: async () => {
            // const moviesCache = await redis.get('moviesCacheApollo')
            const {data} = await axios.get('http://localhost:5001')
            // if(moviesCache) {
            //     console.log(moviesCache, "<<<<<<<<<< ini moviesCache")
            //     return JSON.parse(moviesCache) 
            // } else {
            //     await redis.set('moviesCacheApollo', JSON.stringify(data))
            console.log(data)
                return data
            // }
        },
        series: async () => {
            const seriesCache = await redis.get('seriesCacheApollo')
            const {data} = await axios.get('http://localhost:5002')
            if(seriesCache) {
                return JSON.parse(seriesCache)
            } else {
                redis.set('seriesCacheApollo', JSON.stringify(data))
                return data
            }
        },
        movieById: async (parent, args, context, info) => {
            const movieByIdCache = await redis.get(`movieByIdCacheApollo${args.id}`)
            const {data} = await axios.get(`http://localhost:5001/${args.id}`)
            if(movieByIdCache) {
                return JSON.parse(movieByIdCache)
            } else {
                redis.set(`movieByIdCacheApollo${args.id}`, JSON.stringify(data))
                return data
            }
        },
        serieById: async (parent, args, context, info) => {
            const serieById = await redis.get(`serieByIdCacheApollo${args.id}`)
            const {data} = await axios.get(`http://localhost:5002/${args.id}`)
            if(serieById) {
                return JSON.parse(serieById)
            } else {
                redis.set(`serieByIdCacheApollo${args.id}`, JSON.stringify(data))
                return data
            }
        }
    },

    Mutation: {
        addMovie: async(parent, args, context, info) => {
            // redis.del('moviesCacheApollo')
            const {title, overview, poster_path, popularity, tags} = args
            const {data} = await axios.post('http://localhost:5001', {
                title, overview, poster_path, popularity, tags
            })
            return data
        },
        addSerie: async(parent, args, context, info) => {
            const {title, overview, poster_path, popularity, tags} = args
            const {data} = await axios.post('http://localhost:5002', {
                title, overview, poster_path, popularity, tags
            })
            redis.del('seriesCacheApollo')
            return data
        },
        deleteMovie: async(parent, args, context, info) => {
            redis.del('moviesCacheApollo')
            const {data} = await axios.delete(`http://localhost:5001/${args.id}`)
            return data
        },
        deleteSerie: async(parent, args, context, info) => {
            const {data} = await axios.delete(`http://localhost:5002/${args.id}`)
            redis.del('seriesCacheApollo')
            return data
        },
        updateMovie: async(parent, args, context, info) => {
            // redis.del('moviesCacheApollo')
            const {id, title, overview, poster_path, popularity, tags} = args
            const {data} = await axios.put(`http://localhost:5001/${id}`, {
                title, overview, poster_path, popularity, tags
            })
            return data
        },
        updateSerie: async(parent, args, context, info) => {
            const {id, title, overview, poster_path, popularity, tags} = args
            const {data} = await axios.put(`http://localhost:5002/${id}`, {
                title, overview, poster_path, popularity, tags
            })
            redis.del('seriesCacheApollo')
            return data
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen(PORT, () => {
    console.log(`GraphQL Server is listen on port ${PORT}`)
})
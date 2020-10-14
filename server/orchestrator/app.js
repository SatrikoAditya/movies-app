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
            try {
                const moviesCache = await redis.get('moviesCacheApollo')
                if(moviesCache) {
                    console.log(moviesCache)
                    return(JSON.parse(moviesCache)) 
                } else {
                    redis.del('moviesCacheApollo')
                    const {data} = await axios.get('http://localhost:5001')
                    await redis.set('moviesCacheApollo', JSON.stringify(data))
                    return data
                }
            } catch(err) {
                console.log(err)
            }
        },
        series: async () => {
            try {
                const seriesCache = await redis.get('seriesCacheApollo')
                if(seriesCache) {
                    return JSON.parse(seriesCache)
                } else {
                    const {data} = await axios.get('http://localhost:5002')
                    redis.set('seriesCacheApollo', JSON.stringify(data))
                    return data
                }
            } catch(err) {
                console.log(err)
            }
        },
        movieById: async (parent, args, context, info) => {
            try {
                // const movieByIdCache = await redis.get(`movieByIdCacheApollo${args.id}`)
                const {data} = await axios.get(`http://localhost:5001/${args.id}`)
                // if(movieByIdCache) {
                //     return JSON.parse(movieByIdCache)
                // } else {
                    // redis.set(`movieByIdCacheApollo${args.id}`, JSON.stringify(data))\
                    return data
                // }
            } catch(err) {
                console.log(err)
            }
        },
        serieById: async (parent, args, context, info) => {
            try {
                // const serieById = await redis.get(`serieByIdCacheApollo${args.id}`)
                const {data} = await axios.get(`http://localhost:5002/${args.id}`)
                if(serieById) {
                    return JSON.parse(serieById)
                } else {
                    // redis.set(`serieByIdCacheApollo${args.id}`, JSON.stringify(data))
                    return data
                }
            } catch(err) {
                console.log(err)
            }
        }
    },

    Mutation: {
        addMovie: async(parent, args, context, info) => {
            try {
                await redis.del('moviesCacheApollo')
                const {title, overview, poster_path, popularity, tags} = args
                const {data} = await axios.post('http://localhost:5001', {
                    title, overview, poster_path, popularity, tags
                })
                // await redis.del('movieCacheApollo')
                return data
            } catch(err) {
                console.log(err)
            }
        },
        addSerie: async(parent, args, context, info) => {
            try {
                const {title, overview, poster_path, popularity, tags} = args
                const {data} = await axios.post('http://localhost:5002', {
                    title, overview, poster_path, popularity, tags
                })
                await redis.del('seriesCacheApollo')
                return data
            } catch(err) {
                console.log(err)
            }
        },
        deleteMovie: async(parent, args, context, info) => {
            try {
                await redis.del('moviesCacheApollo')
                const {data} = await axios.delete(`http://localhost:5001/${args.id}`)
                // await redis.del('moviesCacheApollo')
                return data
            } catch(err) {
                console.log(err)
            }
        },
        deleteSerie: async(parent, args, context, info) => {
            try {
                const {data} = await axios.delete(`http://localhost:5002/${args.id}`)
                await redis.del('seriesCacheApollo')
                return data
            } catch(err) {
                console.log(err)
            }
        },
        updateMovie: async(parent, args, context, info) => {
            try {
                await redis.del('moviesCacheApollo')
                const {id, title, overview, poster_path, popularity, tags} = args
                const {data} = await axios.put(`http://localhost:5001/${id}`, {
                    title, overview, poster_path, popularity, tags
                })
                return data
            } catch(err) {
                console.log(err)
            }
        },
        updateSerie: async(parent, args, context, info) => {
            try {
                await redis.del('seriesCacheApollo')
                const {id, title, overview, poster_path, popularity, tags} = args
                const {data} = await axios.put(`http://localhost:5002/${id}`, {
                    title, overview, poster_path, popularity, tags
                })
                return data
            } catch(err) {
                console.log(err)
            }
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen(PORT, () => {
    console.log(`GraphQL Server is listen on port ${PORT}`)
})
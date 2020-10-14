import {ApolloClient, InMemoryCache} from '@apollo/client'
import {GET_FAV} from './schema/index'

const client = new ApolloClient({
    uri: 'http://localhost:5000',
    cache: new InMemoryCache()
})

client.writeQuery({
    query: GET_FAV,
    data: {
        favMovie: []
    }
})

export default client
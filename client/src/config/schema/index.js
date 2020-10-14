import {gql} from '@apollo/client'

export const GET_FAV = gql`
    query {
        favMovie {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const FETCH_MOVIES = gql`
    query {
        movies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const FETCH_SERIES = gql`
    query {
        series {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const DELETE_MOVIE = gql`
    mutation deleteMovie($id: String) {
        deleteMovie(id : $id) {
            result
        }
    }
`

export const ADD_MOVIE = gql`
    mutation addMovie($title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String]!) {
        addMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
            _id
            title
        }
    }
`

export const GET_BY_ID = gql`
    query movieById($id: String) {
        movieById(id: $id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const UPDATE_MOVIE = gql`
    mutation updateMovie($id: String, $title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        updateMovie(id: $id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
            result
        }
    }`

import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_FAV} from '../config/schema/index'
import {Navbar, Spinner} from 'react-bootstrap'
import List from '../components/ListFavorites'

export default function Favorites() {
    const {loading, error, data} = useQuery(GET_FAV)
    if(error) return <p>Errorr....</p>
    return (
        <>
            {loading && <Spinner animation="border" />}
            {!loading && <div className="container rounded" style={{backgroundColor: '#131415', color: '#c2cdd4'}}>
                <Navbar>
                <Navbar.Brand style={{color: '#c2cdd4'}}><h3>Your Favorite Movies</h3></Navbar.Brand>
                <Navbar.Toggle />
                </Navbar>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    {
                        data && data.favMovie.map(fav => {
                            return (
                                <List fav={fav} key={fav._id} />
                            )
                        })
                    }
                </div>
            </div>}  
        </>
    )
}

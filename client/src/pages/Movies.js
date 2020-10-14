import React from 'react'
import {useQuery} from '@apollo/client'
import List from '../components/ListMovie'
import {Navbar, Spinner} from 'react-bootstrap'
import ModalInput from '../components/ModalInputMovie'
import {FETCH_MOVIES} from '../config/schema/index'

function Movies() {
    const {loading, error, data, refetch} = useQuery(FETCH_MOVIES)
    return (
        <>
            {loading && <Spinner animation="border" />}
            {!loading && <div className="container rounded" style={{backgroundColor: '#131415'}}>
                <Navbar className="mb-3">
                <Navbar.Brand style={{color: '#c2cdd4'}}><h3>Movie List</h3></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <ModalInput refetch={refetch} />
                </Navbar.Collapse>
                </Navbar>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    {
                        data && data.movies.map(movie => {
                            return (
                                <List refetch={refetch} movie={movie} key={movie._id} />
                            )
                        })
                    }
                </div>
            </div>}
        </>
    )
}

export default Movies
import React from 'react'
import {useQuery} from '@apollo/client'
import List from '../components//ListSeries'
import {Navbar, Spinner} from 'react-bootstrap'
import {FETCH_SERIES} from '../config/schema/index'

function Series() {
    const {loading, error, data} = useQuery(FETCH_SERIES)
    console.log(data)
    return (
        <>
            {loading && <Spinner animation="border" />}
            {!loading && <div className="container rounded" style={{backgroundColor: '#131415', color: '#c2cdd4'}}>
                <Navbar>
                <Navbar.Brand style={{color: '#c2cdd4'}}><h3>Series List</h3></Navbar.Brand>
                <Navbar.Toggle />
                </Navbar>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    {
                        data && data.series.map(series => {
                            return (
                                <List series={series} key={series._id} />
                            )
                        })
                    }
                </div>
            </div>}
        </>
    )
}

export default Series
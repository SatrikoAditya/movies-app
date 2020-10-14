import React from 'react'
import {Card, Button} from 'react-bootstrap'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import '../App.css';
import ModalUpdate from '../components/ModalUpdateMovie'
import {useMutation} from '@apollo/client'
import {GET_FAV} from '../config/schema/index'
import client from '../config/client'
import {DELETE_MOVIE} from '../config/schema/index'

export default function List({movie, refetch}) {
    const [deleteMovie, {loading, error, data}] = useMutation(DELETE_MOVIE)

    function addFavMovie(data) {
        const {favMovie} = client.readQuery({
            query: GET_FAV
        })
        client.writeQuery({
            query: GET_FAV,
            data: {
                favMovie: [
                    ...favMovie,
                    data
                ]
            }
        })
    }

    function handleDelete(id) {
        deleteMovie({variables: {
            id
        }})
        refetch()
    }

    function Detail() {
        return (
            <div style={{border: 'thin solid #c2cdd4', width: 350}}>
                <Card style={{backgroundColor: '#131415', color: 'white', paddingTop: 10}}>
                    <Card.Title style={{paddingLeft: 6}}> {movie.title} </Card.Title>
                    <hr style={{margin: 0, backgroundColor: '#c2cdd4'}} />
                    <Card.Text style={{marginTop: 10, paddingLeft: 6}}><span role="img">⭐️</span> {movie.popularity} iMDb rating</Card.Text>
                    <Card.Text style={{margin: 0, paddingLeft: 6}}>Overview :</Card.Text>
                    <Card.Text style={{paddingLeft: 6}}> {movie.overview} </Card.Text>
                    <hr style={{margin: 0, backgroundColor: '#c2cdd4'}} />
                    <Card.Text style={{marginTop: 10, marginBottom: 10}}>
                        {
                            movie.tags.map((tag, idx) => {
                                return <span key={idx} style={{marginLeft: 5,marginRight: 5, backgroundColor: '#FFD700', color: 'black', padding: 3}}> {tag} </span>
                            })
                        }
                    </Card.Text>              
                </Card>
                <hr style={{margin: 0, backgroundColor: '#c2cdd4'}} />
                <div style={{padding: 10, backgroundColor: '#131415'}}>
                    <ModalUpdate refetch={() => (refetch())} id={movie._id} />
                    <Button variant="outline-danger" className="btn-sm mr-3" onClick={() => handleDelete(movie._id)}>Delete</Button>
                    <Button variant="outline-warning" className="btn-sm" onClick={() => addFavMovie(movie)}>⭐️ Add To Favorites</Button>
                </div>
            </div>
        )
    }

    return (
        <div className='mb-3 ml-3 mr-1'>
            <Card style={{ width: '9rem', border: 'none', backgroundColor: '#131415' }}>
                    <Tippy interactive={true} placement="right" content={<Detail />}>
                        <Card.Img variant="top" src={movie.poster_path} />
                    </Tippy>
                <Card.Text style={{backgroundColor: '#131415', color: 'white', fontSize: '14px', textAlign: 'center'}}>{movie.title}</Card.Text>
            </Card>
        </div>
    )
}

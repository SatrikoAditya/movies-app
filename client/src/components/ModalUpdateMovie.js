import React, {useState, useEffect} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import {gql, useMutation, useQuery} from '@apollo/client'
import {GET_BY_ID, UPDATE_MOVIE} from '../config/schema/index'

export default function ModalUpdate({ id }) {
    const {loading: loadingById, error: errorById, data: dataById} = useQuery(GET_BY_ID, {
        variables: {
            id
        }
    })

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [popularity, setPopularity] = useState(0)
    const [tags, setTags] = useState([])
    const [show, setShow] = useState(false)
    
    const [updateMovie, {loading, error, data}] = useMutation(UPDATE_MOVIE)

    const handleClose = () => setShow(false)
    const handleShow = () => {
        
        setShow(true)
    }
    useEffect(() => {
        if(dataById) {
            setTitle(dataById.movieById.title)
            setOverview(dataById.movieById.overview)
            setPoster_path(dataById.movieById.poster_path)
            setPopularity(dataById.movieById.popularity)
            setTags(dataById.movieById.tags.join())
        }
    }, [dataById])
    
    const handleInputTitle = (event) => {
        setTitle(event.target.value)
    } 
    const handleInputOverview = (event) => {
        setOverview(event.target.value)
    }
    const handleInputPosterPath = (event) => {
        setPoster_path(event.target.value)
    }
    const handleInputPopularity = (event) => {
        setPopularity(event.target.value)
    }
    const handleInputTags = (event) => {
        setTags(event.target.value)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        updateMovie({variables: {
            id, title, overview, poster_path, popularity, tags : tags.split(',')
        }, refetchQueries : [{
            query: gql`
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
        }]})
        setShow(false)
        setTitle('')
        setOverview('')
        setPoster_path('')
        setPopularity(0)
        setTags([])
    }

    return (
        <>
            <Button className="btn-sm mr-3" variant="outline-success" onClick={handleShow}>Edit</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} onChange={handleInputTitle} type="text" placeholder="Input Title Here..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Overview</Form.Label>
                            <Form.Control value={overview} onChange={handleInputOverview} type="text" placeholder="Input Overview Here..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Poster Path</Form.Label>
                            <Form.Control value={poster_path} onChange={handleInputPosterPath} type="text" placeholder="Input Poster Path Here..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Popularity</Form.Label>
                            <Form.Control value={popularity} onChange={handleInputPopularity} type="number" placeholder="Input Popularity Here..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tags</Form.Label>
                            <Form.Control value={tags} onChange={handleInputTags} type="text" placeholder="Input Tags Here, use comma to separate" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

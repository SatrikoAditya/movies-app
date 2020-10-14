import React, {useState} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import {gql, useMutation} from '@apollo/client'
import {ADD_MOVIE} from '../config/schema/index'

export default function ModalInput({refetch}) {
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [popularity, setPopularity] = useState(null)
    const [tags, setTags] = useState([])
    const [addMovie, {error}] = useMutation(ADD_MOVIE)
    const [inputError, setInputError] = useState('')

    const handleClose = () => {
        setShow(false)
        setInputError('')
    }
    const handleShow = () => setShow(true)

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
        setTags(event.target.value.split(','))
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if(!title || !overview || !poster_path || !popularity || tags.length === 0) {
            setInputError('All field is required!')
        } else {
            addMovie({variables: {
                title, overview, poster_path, popularity: Number(popularity), tags
            }})
            setShow(false)
            refetch()
            setTitle('')
            setOverview('')
            setPoster_path('')
            setPopularity(0)
            setTags([])
        }
    }

    return (
        <>
            <Button variant="outline-warning" onClick={handleShow}>
                + Add New Movies
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} onChange={handleInputTitle} type="text" placeholder="Input title here..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Overview</Form.Label>
                            <Form.Control value={overview} onChange={handleInputOverview} type="text" placeholder="Input overview here..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Poster Path</Form.Label>
                            <Form.Control value={poster_path} onChange={handleInputPosterPath} type="text" placeholder="Input poster path here..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Popularity</Form.Label>
                            <Form.Control value={popularity} onChange={handleInputPopularity} type="number" placeholder="Input popularity here..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tags</Form.Label>
                            <Form.Control value={tags} onChange={handleInputTags} type="text" placeholder="Input tags here, use comma to separate" />
                            {inputError && <h6> {inputError} </h6>}
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

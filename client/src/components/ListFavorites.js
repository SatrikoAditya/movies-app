import React from 'react'
import {Card} from 'react-bootstrap'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

export default function ListFavorites({fav}) {
    function Detail() {
        return (
            <div style={{border: 'thin solid #c2cdd4'}}>
                <Card style={{backgroundColor: '#131415', color: 'white', paddingTop: 10}}>
                    <Card.Title style={{paddingLeft: 6}}> {fav.title} </Card.Title>
                    <hr style={{margin: 0, backgroundColor: '#c2cdd4'}} />
                    <Card.Text style={{marginTop: 10, paddingLeft: 6}}><span role="img">⭐️</span> {fav.popularity} iMDb rating</Card.Text>
                    <Card.Text style={{margin: 0, paddingLeft: 6}}>Overview :</Card.Text>
                    <Card.Text style={{paddingLeft: 6}}> {fav.overview} </Card.Text>
                    <hr style={{margin: 0, backgroundColor: '#c2cdd4'}} />
                    <Card.Text style={{marginTop: 10, marginBottom: 10}}>
                        {
                            fav.tags.map((tag, idx) => {
                                return <span key={idx} style={{marginLeft: 5,marginRight: 5, backgroundColor: '#FFD700', color: 'black', padding: 3}}> {tag} </span>
                            })
                        }
                    </Card.Text>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <div className='mb-3 ml-3'>
                <Card style={{ width: '9rem', border: 'none' }}>
                    <Tippy placement="right" content={<Detail />}>
                        <Card.Img variant="top" src={fav.poster_path} />
                    </Tippy>
                    <Card.Text style={{backgroundColor: '#131415', color: 'white', fontSize: '14px', textAlign: 'center'}}>{fav.title}</Card.Text>
                </Card>
            </div>
        </div>
    )
}

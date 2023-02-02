import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import {FcMusic} from "react-icons/fc";

class Album extends Component {
    render() {
        return (
                <Card
                    bg="dark"
                    text="danger"
                    style={{ width: '18rem' }}
                    className="mb-2">
                    <Card.Header>{this.props.album.artists[0].name}</Card.Header>
                    <Card.Body>
                        <Card.Img src={this.props.album.images[0].url} />
                        <Card.Title>{this.props.album.name}</Card.Title>
                        {/* https://youtu.be/eDw46GYAIDQ */}
                        <div className='rating'>
                            {[...Array(5)].map((note) =>{
                                return(
                                    <label>
                                        <input type="radio" name="album-rating"/>
                                        <FcMusic size = "30"/>
                                    </label>
                                ) 
                            })}         
                        </div>  
                        <NavLink to={"/album/" + this.props.album.id}>
                            <Button variant="danger">View Album</Button>
                        </NavLink>
                    </Card.Body>
                </Card>
        )
    }
}

export default Album;
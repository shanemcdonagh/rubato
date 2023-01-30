import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

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
                        <NavLink to={"/album/" + this.props.album.id}>
                                <Button variant="danger">View Album</Button>
                            </NavLink>
                    </Card.Body>
                </Card>
        )
    }
}

export default Album;
import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

class Artist extends Component {
    render() {
        return (
            <Card
                bg="dark"
                text="danger"
                style={{ width: '18rem' }}
                className="mb-2" key={this.props.artist.id}>
                <Card.Header>{this.props.artist.name}</Card.Header>
                <Card.Body>
                    <Card.Img src={this.props.artist.images[0].url} width="230.4px" height="230.4px" />
                    <NavLink to={"/artists/albums/?term=" + this.props.artist.name}>
                        <Button variant="danger">View Albums</Button>
                    </NavLink>
                </Card.Body>
            </Card>
        )
    }
}

export default Artist;
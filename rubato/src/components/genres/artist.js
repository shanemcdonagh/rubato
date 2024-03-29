import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

class Artist extends Component {
    render() {

        // Checks if the artist has an image
        const image = this.props.artist.images[0] ? this.props.artist.images[0].url : "https://via.placeholder.com/230x230.png?text=Artist+Image";

        return (
            <Card
                bg="dark"
                text="danger"
                style={{ width: '18rem', marginLeft: '1%' }}
                className="mb-2 genre-card" key={this.props.artist.id}>
                <Card.Header>{this.props.artist.name}</Card.Header>
                <Card.Body>
                    <Card.Img src={image} width="230.4px" height="230.4px" />
                </Card.Body>
                <NavLink to={"/artists/albums/?term=" + this.props.artist.name}>
                        <Button variant="danger" className="view-button">View Albums</Button>
                </NavLink>
            </Card>
        )
    }
}

export default Artist;
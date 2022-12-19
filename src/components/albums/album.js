import React, { Component } from 'react';
import { Card, Row, Container } from 'react-bootstrap';

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
                    </Card.Body>
                </Card>
        )
    }
}

export default Album;
import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

class Genre extends Component {
    render() {
        return (
            <Card
                bg="dark"
                text="danger"
                style={{ width: '18rem', marginLeft: '1%' }}
                className="mb-2 genre-card" key={this.props.key}>
                    <Card.Header>{this.props.genre.genre.toUpperCase()}</Card.Header>
                    <Card.Body>
                        <Card.Img src={this.props.genre.url} width="220.4px" height="220.4px" />
                    </Card.Body>
                <NavLink to={"/genre/albums/?term=" + this.props.genre.genre}>
                    <Button variant="danger" className="view-button">View Artists</Button>
                </NavLink>
            </Card>
        )
    }
}

export default Genre;
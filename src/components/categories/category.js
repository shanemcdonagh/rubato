import React, { Component } from 'react';
import { Card, Row, Container } from 'react-bootstrap';

class Category extends Component {
    render() {
        return (
                <Card
                    bg="dark"
                    text="danger"
                    style={{ width: '18rem' }}
                    className="mb-2">
                    <Card.Header>{this.props.category.name}</Card.Header>
                    <Card.Body>
                        <Card.Img src={this.props.category.icons[0].url} />
                    </Card.Body>
                </Card>
        )
    }
}

export default Category;
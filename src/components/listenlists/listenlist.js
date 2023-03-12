import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class ListenList extends Component {
    render() {
        return (
            <Card
                bg="dark"
                text="danger"
                style={{ width: '18rem' }}
                className="mb-2" key={this.props.list.id}>
                <Card.Header>{this.props.list.name}</Card.Header>
            </Card>
        )
    }
}

export default ListenList;
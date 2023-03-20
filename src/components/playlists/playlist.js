import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

class Playlist extends Component {
    render() {
        return (
            <Card
                bg="dark"
                text="danger"
                style={{ width: '18rem', marginLeft: '1%'}}
                className="mb-2 playlist" key={this.props.key} border="danger">
                <Card.Header><b>{this.props.playlist.name}</b></Card.Header>
                <Card.Body>
                    <Card.Img src={this.props.playlist.images[0].url} width="220.4px" height="220.4px" />
                    <Card.Text className='playlistDescription'>
                       {this.props.playlist.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default Playlist;
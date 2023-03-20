// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Album from './album';


// Class Albums - Extends Component class
class Albums extends Component {

    // Method - Visual content of the component
    render() {
        return (
            <div className='content'>
                <Container>
                <Row className="mx-2 row row-col-4">
                    {this.props.albums.map((album) => {
                        return <Album album={album} key={album.id}/>;
                    })}
                </Row>
            </Container>
            </div>   
        );
    }
}

export default Albums;
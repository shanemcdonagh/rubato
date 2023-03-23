// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Album from './album';

class Albums extends Component {
    render() {
        return (
            <div className='album-container'>
                <Container>
                <Row>
                    {this.props.albums.map((album) => {
                        return (
                            <Col md={3} lg={4} key={album.id}>
                                <Album album={album} />
                            </Col>
                        );
                    })}
                </Row>
                </Container>    
            </div>  
        );
    }
}

export default Albums;
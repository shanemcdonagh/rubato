// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Category from './category';


// Class Plants - Extends Component class
class Categories extends Component {

    // Method - Visual content of the component
    render() {
        return (
            <div className='content'>
                <Container>
                <Row className="mx-2 row row-col-4">
                    {this.props.albums.map((album) => {
                        return <Category album={album} key={album.id}></Category>;
                    })}
                </Row>
            </Container>
            </div>
            
        );
    }
}

export default Categories;
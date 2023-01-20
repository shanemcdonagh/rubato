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
                    {this.props.categories.map((category) => {
                        return <Category category={category} key={category.id}></Category>;
                    })}
                </Row>
            </Container>
            </div>
            
        );
    }
}

export default Categories;
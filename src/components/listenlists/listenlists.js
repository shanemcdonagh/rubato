// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import ListenList from './listenlist';


// Class Plants - Extends Component class
class ListenLists extends Component {

    // Method - Visual content of the component
    render() {
        return (
            <div className='content'>
                <Container>
                <Row className="mx-2 row row-col-4">
                    {this.props.lists.map((list) => {
                        return <ListenList list={list} key={list.id}></ListenList>;
                    })}
                </Row>
            </Container>
            </div>   
        );
    }
}

export default ListenLists;
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

class DiaryEntry extends Component {

    render() { 
        return (
            <div>
                {/* Props - Accesses data passed as a property to current component
                <Container className='container-fluid'>
                    <hr />
                    <Row className="listen-list-row">
                        <Col>
                            <p>Name</p>
                            <h3>{this.props.list.name}</h3>
                        </Col>
                        <Col>
                            <p>Albums</p>
                            <h3>{this.props.list.albums.length}</h3>
                        </Col>

                        <Col>
                            <NavLink to={"/lists/albums/?term=" + this.props.list._id}>
                                <Button variant="danger">View Albums</Button>
                            </NavLink>
                            <Button variant="danger" onClick={() => { this.DeleteList() }}>Delete</Button>
                        </Col>
                    </Row>
                    <hr />
                </Container> */}
            </div>
        )
    }
}

export default DiaryEntry;
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

class DiaryEntry extends Component {

    render() { 
        return (
            <div>
                {/* Props - Accesses data passed as a property to current component */}
                <Container className='container-fluid list-item diary-item'>
                    <hr />
                    <Row className="listen-list-row">
                        <Col>
                            <h3>{this.props.entry.entry}</h3>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            </div>
        )
    }
}

export default DiaryEntry;
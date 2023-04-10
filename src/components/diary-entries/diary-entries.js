// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import DiaryEntry from './diary-entry';

class DiaryEntries extends Component {
    render() {
        return (
            <div className='album-container'>
                <Container>
                <Row>
                    {this.props.entries.map((entry) => {
                        return (
                            <Col md={3} lg={4} key={entry.id}>
                                <DiaryEntry entry={entry} />
                            </Col>
                        );
                    })}
                </Row>
                </Container>    
            </div>  
        );
    }
}

export default DiaryEntries;
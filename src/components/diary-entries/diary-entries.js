// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import DiaryEntry from './diary-entry';

class DiaryEntries extends Component {
    render() {
        return (
            <div>
                {this.props.entries.map((entry) => {
                    return <DiaryEntry entry={entry} />;
                })}
            </div>
        );
    }
}

export default DiaryEntries;
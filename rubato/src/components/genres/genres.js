// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import Genre from './genre';


// Class Plants - Extends Component class
class Genres extends Component {
    

    // Method - Visual content of the component
    render() {

        console.log(this.props.genres)
        return (
            <div className='genres'>
                <Container>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Genre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Row className="mx-2 row row-col-4 genre-list">
                                        {this.props.genres.map((genre) => {
                                            return <Genre genre={genre} key={genre.id}/>;
                                        })}
                                    </Row>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Genres;
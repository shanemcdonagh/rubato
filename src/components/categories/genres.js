// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import Genre from './genre';


// Class Plants - Extends Component class
class Genres extends Component {

    // Method - Visual content of the component
    render() {
        return (
            <div className='categories' style={{marginLeft: '15vh'}}>
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
                            <Row className="mx-2 row row-col-4">
                                {this.props.genres.map((genre) => {
                                    return <Genre genre={genre} key={genre.id}></Genre>;
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
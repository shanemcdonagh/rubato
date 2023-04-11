// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import axios from "axios";
import Artist from "../genres/artist";

// Class Plants - Extends Component class
class ReviewedAlbums extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: []
        };
    }

    // Method: Called first when component is mounted into view
    componentDidMount() 
    {
        
    }

    // Method - Visual content of the component
    render() {
        return (
            <div className='genres'>
                <Container>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Albums Reviewed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Row className="mx-2 row row-col-4 genre-list">
                                        {this.state.albums.map((artist) => {
                                            return <Album album={album} key={album.id} />;
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

export default DiaryArtists;
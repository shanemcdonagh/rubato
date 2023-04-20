// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import axios from "axios";
import Artist from "../genres/artist";

// Class Plants - Extends Component class
class DiaryArtists extends Component {

    constructor(props) {
        super(props);

        this.state = {
            artists: []
        };
    }

    // Method: Called first when component is mounted into view
    componentDidMount() 
    {
        // Promise - Result of an asynchronous operation
        // Axios - Promise based HTTP client
        axios.get(`http://localhost:4000/search/topArtists`)
            .then((response) => {
                this.setState({ artists: response.data })
                console.log(this.state.artists)
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server: " + error);
            })
    }

    // Method - Visual content of the component
    render() {
        return (
            <div className='genres'>
                <Container>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Artists</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Row className="mx-2 row row-col-4 genre-list">
                                        {this.state.artists.map((artist) => {
                                            return <Artist artist={artist} key={artist.id} />;
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
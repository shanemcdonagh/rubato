// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import axios from "axios";
import Album from '../albums/album';


class ArtistAlbums extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            lists: []
        };
    }

    // Method: Called first when component is mounted into view
    componentDidMount() {

        // Reference: https://herewecode.io/blog/react-get-url-params/
        // Allows to retrieve the genreID from the url parameters
        const queryParameters = new URLSearchParams(window.location.search)
        const term = queryParameters.get("term")

        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        axios.get(`http://localhost:4000/search/${term}`)
            .then((response) => {
                this.setState({ albums: response.data })
                console.log(this.state.albums)
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })

        // Allows us to select a list to add the album to
        axios.post('http://localhost:4000/list/retrieveLists', { userID: localStorage.getItem("userID") })
            .then((response) => {
                this.setState({ lists: response.data })
            })
            .catch((error) => {
                console.log("Cannot retrieve lists from server: " + error);
            });
    }

    // Method - Visual content of the component
    render() {
        return (
            <div className='genres'>
                <Container>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Albums</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Row className="mx-2 row row-col-4 genre-list">
                                        {this.state.albums.map((album) => {
                                            return <Album album={album} key={album.id} lists={this.state.lists} />;
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

export default ArtistAlbums;
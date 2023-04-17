// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row, Table, Button } from 'react-bootstrap';
import axios from "axios";
import Album from '../albums/album';

// Class Plants - Extends Component class
class ListenListAlbums extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            listID: ""
        };
    }

    // Method: Called first when component is mounted into view
    componentDidMount() {

        // Reference: https://herewecode.io/blog/react-get-url-params/
        // Allows to retrieve the genreID from the url parameters
        const queryParameters = new URLSearchParams(window.location.search)
        const term = queryParameters.get("term")
        this.setState({ listID: term })

        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        axios.get(`http://localhost:4000/list/retrieveListAlbums/${term}`)
            .then((response) => {
                this.setState({ albums: response.data })
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })
    }

    // Method - Removes album based on its id
    DeleteFromList(albumID) {

        //REF: https://www.w3schools.com/jsref/met_win_confirm.asp
        if (window.confirm("Are you sure you want to remove this album?") === true) {

            axios.patch("http://localhost:4000/list/deleteAlbum/", { albumID, listID: this.state.listID, userID: localStorage.getItem("userID") })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log("Cannot remove list from server: " + error);
                });
        }
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
                                           return <div>
                                                <Album album={album} />
                                                <Button variant="danger" onClick={() => { this.DeleteFromList(album.id) }}>Remove Album</Button>
                                            </div>
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

export default ListenListAlbums;
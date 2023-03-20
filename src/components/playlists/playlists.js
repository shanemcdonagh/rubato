// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import axios from "axios";
import Playlist from './playlist';

// Class Plants - Extends Component class
class Playlists extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dayOfWeek: "",
            playlists: []
        };
    }

    // Method: Called first when component is mounted into view
    componentDidMount() {

        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        axios.get(`http://localhost:4000/playlists`)
            .then((response) => {
                this.setState({ playlists: response.data.playlists.items, dayOfWeek: response.data.message})
                console.log(this.state.playlists)
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })
    }

    // Method - Visual content of the component
    render() {
        return (
            <div className='playlists'>
                <Container>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>{this.state.dayOfWeek}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Row className="mx-2 row row-col-4 genre-list">
                                        {this.state.playlists.map((playlist) => {
                                            return <Playlist playlist={playlist} key={playlist.id}></Playlist>;
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

export default Playlists;
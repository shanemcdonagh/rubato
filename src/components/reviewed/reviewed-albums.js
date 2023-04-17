// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import axios from "axios";
import Album from "../albums/album"

// Class Plants - Extends Component class
class ReviewedAlbums extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: []
        };
    }

    // Method: Called first when component is mounted into view
    componentDidMount() {
        axios.post("http://localhost:4000/review/allReviews", {
            userID: localStorage.getItem("userID")
        })
            .then(response => {
                this.setState({
                    albums: response.data
                });
                console.log(this.state.albums);
            })
            .catch(error => {
                console.log("Cannot retrieve reviews from server: " + error);
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
                                <th>Albums Reviewed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Row className="mx-2 row row-col-4 genre-list">
                                        {this.state.albums.map((album) => {
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

export default ReviewedAlbums;
// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Table, Row } from 'react-bootstrap';
import axios from "axios";
import Album from './album';

class Albums extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: []
        };
    }

    componentDidMount() {

        // Allows us to select a list to add the album to
        axios.post('/list/retrieveLists', { userID: localStorage.getItem("userID") })
            .then((response) => {
                this.setState({ lists: response.data })
            })
            .catch((error) => {
                console.log("Cannot retrieve lists from server: " + error);
            });
    }

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
                                        {this.props.albums.map((album) => {
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

export default Albums;
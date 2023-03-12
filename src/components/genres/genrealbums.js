// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from "axios";
import Artist from './artist';

// Class Plants - Extends Component class
class GenreAlbums extends Component {

    constructor(props) {
        super(props);

        this.state = {
          artists: []
        };
      }

    // Method: Called first when component is mounted into view
    componentDidMount(){

        // Reference: https://herewecode.io/blog/react-get-url-params/
        // Allows to retrieve the genreID from the url parameters
        const queryParameters = new URLSearchParams(window.location.search)
        const term = queryParameters.get("term")

        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        axios.get(`http://localhost:4000/genre/${term}`)
            .then((response) => {
                this.setState({artists: response.data})
                console.log(this.state.artists)
            })  
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })
    }

    // Method - Visual content of the component
    render() {
        return (
            <div className='content'>
                <Container>
                <Row className="mx-2 row row-col-4">
                    {this.state.artists.map((artist) => {
                        return <Artist artist={artist} key={artist.id}></Artist>;
                    })}
                </Row>
            </Container>
            </div>
            
        );
    }
}

export default GenreAlbums;
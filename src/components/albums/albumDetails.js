import React, { Component } from "react";
import axios from "axios";
import {Image, Container, Row, Col} from 'react-bootstrap'

class AlbumDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
          album: [],
          image: [],
          tracks: ""
        };
      }

    // Method: Called first when component is mounted into view
    componentDidMount(){

        // Reference: https://herewecode.io/blog/react-get-url-params/
        // Allows to retrieve the albumId from the url parameters
        const queryParameters = new URLSearchParams(window.location.search)
        const term = queryParameters.get("term")

        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        axios.get('http://localhost:4000/album/' + term)
            .then((response) => {
                this.setState({album: response.data})
                this.setState({image: this.state.album.images[1]})
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })
    }


    render() {
        return (
            <div className="content">
                <Image src={this.state.image.url}></Image>
                <h1><b>{this.state.album.name}</b></h1>
                <Container> 
      <Row>
      </Row>
    </Container>

            </div>
        );

    }
}

// Export for use in App.js
export default AlbumDetails;
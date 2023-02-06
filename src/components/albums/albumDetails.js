import React, { Component } from "react";
import axios from "axios";
import Image from 'react-bootstrap/Image'

class AlbumDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
          album: []
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
                console.log(this.state.album)
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })
    }


    render() {
        return (
            <div className="content">
                <p>{this.state.album.genres}</p>
            </div>
        );

    }
}

// Export for use in App.js
export default AlbumDetails;
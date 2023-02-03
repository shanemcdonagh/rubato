import React, { Component } from "react";
import {useParams} from 'react-router-dom';

class AlbumDetails extends Component {

    // Method: Called first when component is mounted into view
    componentDidMount(){

        // Reference: https://herewecode.io/blog/react-get-url-params/
        // Allows to retrieve the albumId from the url parameters
        const queryParameters = new URLSearchParams(window.location.search)
        const term = queryParameters.get("term")


        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        // axios.get('http://localhost:4000/home')
        //     .then((response) => {
        //         this.setState({categories: response.data})
        //     })
        //     .catch((error) => {
        //         console.log("Cannot retrieve information from server");
        //     })
    }


    render() {
        return (
            <div className="content">Hello</div>
        );

    }
}

// Export for use in App.js
export default AlbumDetails;
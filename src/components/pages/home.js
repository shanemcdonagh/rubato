import axios from "axios";
import React, { Component } from "react";
import Genres from "../genres/genres";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: []
        };
    }


    componentDidMount(){
        // Promise - Result of an asynchronous operation
        // Axios - Promise based HTTP client
        axios.get('http://localhost:4000/home')
            .then((response) => {
                console.log(response.data)
                this.setState({genres: response.data})
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server: " + error);
            })
    }

    render() {
        return (
            <div>
                <Genres genres={this.state.genres}></Genres>
            </div>  
        );
    }
}

// Export for use in App.js
export default Home;
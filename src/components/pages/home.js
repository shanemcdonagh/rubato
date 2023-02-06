import axios from "axios";
import React, { Component } from "react";
import Genres from "../categories/genres";

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
                this.setState({genres: response.data})
                console.log(this.state.genres)
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server");
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
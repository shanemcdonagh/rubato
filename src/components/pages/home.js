import axios from "axios";
import React, { Component, Image } from "react";
import logo from '../../images/simplelogo.png';
import Genres from "../genres/genres";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: []
        };
    }


    componentDidMount() {
        // Promise - Result of an asynchronous operation
        // Axios - Promise based HTTP client
        axios.get('http://localhost:4000/home')
            .then((response) => {
                console.log(response.data)
                this.setState({ genres: response.data })
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server: " + error);
            })
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="welcomeMessage"><b>WELCOME TO RUBATO</b></h2>
                    <img src={logo} className="welcomeLogo"/>
                    <p className="descriptor">Rubato can be used as a diary, to track/review albums you've been
                        listening to, or even as a way to list your favourite albums and artists.
                    </p>
                    <p className="descriptor">Begin by browsing a genre orexploring artists of your choosing, you decide your music</p>
                </div>

                <Genres genres={this.state.genres} />
            </div>
        );
    }
}

// Export for use in App.js
export default Home;
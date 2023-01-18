import axios from "axios";
import React, { Component } from "react";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }


    componentDidMount(){

        // Promise - Result of an asynchronous operation
        // Axios - Promise based HTTP client
        axios.get('http://localhost:4000/home')
            .then((response) => {
                this.setState({categories: response.data})
                console.log(this.state.categories);
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server");
            })
    }


    render() {
        return (
            <div className="content">
                <p>This is the Home Page (where certain artists and albums will be displayed)</p>
            </div>      
        );
    }
}

// Export for use in App.js
export default Home;
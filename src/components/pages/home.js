import axios from "axios";
import React, { Component } from "react";
import Categories from "../categories/categories";

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
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server");
            })
    }

    render() {
        return (
            <div>
                <Categories categories={this.state.categories}></Categories>
            </div>  
        );
    }
}

// Export for use in App.js
export default Home;
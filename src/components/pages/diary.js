import React, { Component } from "react";
import axios from "axios";

class Diary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: []
        };
    }

    componentDidMount() {
        axios.post('http://localhost:4000/retrieveDiaryEntries', { userID: localStorage.getItem("userID") })
            .then((response) => {
                this.setState({
                    entries: response.data
                })
                console.log(this.state.entries);
            })
            .catch((error) => {
                console.log("Cannot retrieve lists from server: " + error);
            });
    }

    render() {
        return (
            <div className="content"><p>This is the Diary Page (where recent activity and reviews will be displayed)</p></div>
        );

    }
}

// Export for use in App.js
export default Diary;
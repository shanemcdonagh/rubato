import React, { Component } from "react";
import axios from "axios";
import DiaryEntries from "../diary-entries/diary-entries";
import DiaryArtists from "../diary-entries/diary-artists";

class Diary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: []
        };
    }

    componentDidMount() {
        axios.post('http://localhost:4000/diary/retrieveDiaryEntries', { userID: localStorage.getItem("userID") })
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
            <div>
                <h2 className="welcomeMessage"><b>DIARY</b></h2>
                <DiaryEntries entries={this.state.entries}/>

                {this.state.entries.length < 10 && (
                        <div>
                            <h2>Haven't a clue who to explore?</h2>
                            <h3 className="playlist-descriptor">See these top artists for inspiration</h3>
                            <div className="playlists">
                                <DiaryArtists/>
                            </div>
                        </div>
                    )}
            </div>
        );

    }
}

// Export for use in App.js
export default Diary;
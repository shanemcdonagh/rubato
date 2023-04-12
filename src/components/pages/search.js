import React, { Component } from "react";
import { FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Albums from "../albums/albums";


class Search extends Component {
    // https://reactjs.org/docs/hooks-state.html
    // Initially ensures search value and card values are empty
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            albums: [],
            topAlbums: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/topAlbums')
            .then((response) => {

                this.setState({ topAlbums: response.data.items })
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    search() {
        axios.get('http://localhost:4000/search/' + this.state.search)
            .then((response) => {
                this.setState({ albums: response.data })
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server");
            })
    }

    render() {
        const { albums, topAlbums } = this.state;

        return (
            <div className="search-container">
                <div className="search-bar-container">
                    <InputGroup className="mb-3 search-bar" size="lg" style={{ width: '50vw' }}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onKeyDown={event => {
                                if (event.key === "Enter") {
                                    this.search();
                                }
                            }}
                            // When the value of the form changes, update the value of the search field
                            onChange={event => this.setState({ search: event.target.value })}
                        />
                        <Button variant="outline-danger" onClick={() => { this.search() }}>Search</Button>
                    </InputGroup>
                </div>
                <div>


                    {albums.length === 0 && (
                        <div>
                            <h2>Not sure where to start?</h2>
                            <h3 className="playlist-descriptor">See these top albums for inspiration</h3>
                            <div className="playlists">
                                <Albums albums={topAlbums} />
                            </div>
                        </div>
                    )}

                    <Albums albums={albums} />
                </div>
            </div>
        );
    }
}

// Export for use in App.js
export default Search;
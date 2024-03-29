import React, { Component } from "react";
import axios from "axios";
import { Image, Container, Row, Col } from 'react-bootstrap'

class AlbumDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            album: [],
            artist: [],
            image: [],
            tracks: []
        };
    }

    // Method: Called first when component is mounted into view
    componentDidMount() {

        // Reference: https://herewecode.io/blog/react-get-url-params/
        // Allows to retrieve the albumId from the url parameters
        const queryParameters = new URLSearchParams(window.location.search)
        const term = queryParameters.get("term")

        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        axios.get(`/album/${term}`)
            .then((response) => {
                this.setState({
                    album: response.data,
                    image: response.data.images[1],
                    artist: response.data.artists[0]
                })
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })

        axios.get(`/album/${term}/tracks`)
            .then((response) => {
                this.setState({ tracks: response.data.items })
                console.log(this.state.tracks);
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })
    }

    render() {

        const { album, image, artist } = this.state

        return (
            <div className="albumDetails">
                <div>
                    <Image src={image.url} style={{ marginTop: '5vh' }}></Image>
                    <h1><b>{album.name}</b></h1>
                    <h2><b>{artist.name}</b></h2>
                    <Container className="list-item">
                        {this.state.tracks.map(track => (
                            <Row key={track.id} className="listen-list-row">
                                <Col>
                                    <p>Name</p>
                                    <h3>{track.name}</h3>
                                </Col>
                                <Col>
                                    <p>Artist</p>
                                    <h3>{track.artists[0].name}</h3>
                                </Col>
                                <Col>
                                    <p>Duration</p>
                                    <h3>{Math.floor(track.duration_ms / 60000)}:
                                        {((track.duration_ms % 60000) / 1000)
                                            .toFixed(0)
                                            .padStart(2, "0")}</h3>
                                </Col>
                                <Col>
                                    <audio controls>
                                        <source src={track.preview_url} type="audio/mpeg" />
                                    </audio>
                                </Col>
                            </Row>
                        ))}
                    </Container>
                </div>
            </div>
        );

    }
}

// Export for use in App.js
export default AlbumDetails;
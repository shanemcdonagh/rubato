import React, { Component } from "react";
import axios from "axios";
import { Image, Container, Row, Col } from 'react-bootstrap'
import { IoMusicalNotesSharp } from "react-icons/io5";
import SpotifyWebApi from 'spotify-web-api-js';

class AlbumDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            album: [],
            artist: [],
            image: [],
            tracks: [],
            rating: 0,
            hover: 0,
            accessToken: null
        };

        this.spotifyApi = new SpotifyWebApi();
    }

    // Method: Called first when component is mounted into view
    componentDidMount() {

        // Reference: https://herewecode.io/blog/react-get-url-params/
        // Allows to retrieve the albumId from the url parameters
        const queryParameters = new URLSearchParams(window.location.search)
        const term = queryParameters.get("term")

        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        axios.get(`http://localhost:4000/album/${term}`)
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

        axios.get(`http://localhost:4000/album/${term}/tracks`)
            .then((response) => {
                this.setState({ tracks: response.data.items })
                console.log(this.state.tracks);
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })

        // Get Spotify access token
        axios.get('http://localhost:4000/accessToken')
            .then((response) => {
                const { access_token } = response.data;
                this.setState({ accessToken: access_token });
                this.spotifyApi.setAccessToken(access_token);
            })
            .catch((error) => {
                console.error('Error getting Spotify access token:', error);
            });
    }

    // Play a snippet of a track
    playTrack(trackId) {
        const { accessToken } = this.state;
        if (!accessToken) {
            console.error('Spotify access token not found.');
            return;
        }

        this.spotifyApi.play({
            uris: [`spotify:track:${trackId}`],
            position_ms: 10000, // Start playing 10 seconds into the track
        })
            .then((response) => {
                console.log('Track is now playing.');
            })
            .catch((error) => {
                console.error('Error playing track:', error);
            });
    }

    render() {

        const { album, image, artist, hover, rating } = this.state

        return (
            <div className="albumDetails">
                <div>
                    <Image src={image.url} style={{ marginTop: '5vh' }}></Image>
                    <h1><b>{album.name}</b></h1>
                    <h2><b>{artist.name}</b></h2>
                    {/* https://youtu.be/eDw46GYAIDQ */}
                    <div className='rating'>
                        {[...Array(5)].map((note, i) => {

                            const ratingScore = i + 1;

                            return (
                                <label>
                                    <input type="radio" name="album-rating" value={ratingScore}
                                        onClick={() => this.setState({ rating: ratingScore })} />

                                    <IoMusicalNotesSharp className='music-note' size="30"
                                        color={ratingScore <= (hover || rating) ? "red" : "grey"}
                                        onMouseEnter={() => this.setState({ hover: ratingScore })}
                                        onMouseLeave={() => this.setState({ hover: 0 })} />
                                </label>
                            )
                        })}
                    </div>
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
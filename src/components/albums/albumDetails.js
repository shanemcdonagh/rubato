import React, { Component } from "react";
import axios from "axios";
import {Image, Container, Row, Col} from 'react-bootstrap'
import {IoMusicalNotesSharp} from "react-icons/io5";

class AlbumDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
          album: [],
          artist: [],
          image: [],
          tracks: [],
          rating: 0,
          hover: 0
        };
      }

    // Method: Called first when component is mounted into view
    componentDidMount(){

        // Reference: https://herewecode.io/blog/react-get-url-params/
        // Allows to retrieve the albumId from the url parameters
        const queryParameters = new URLSearchParams(window.location.search)
        const term = queryParameters.get("term")

        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        axios.get('http://localhost:4000/album/' + term)
            .then((response) => {
                this.setState({album: response.data})
                this.setState({image: response.data.images[1]})
                this.setState({artist: response.data.artists[0]})

            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })

        axios.get('http://localhost:4000/album/' + term + '/tracks')
        .then((response) => {
            this.setState({tracks: response.data.items})
        })
        .catch((error) => {
            console.log("Cannot retrieve information from server " + error);
        })
    }


    render() {

        const {album,image,artist, hover, rating} = this.state

        return (
            <div className="content">
                <div style={{backgroundColor: '#2f302f', justifyContent: 'center', marginRight: '20vh', marginTop: '-25vh', borderRadius: '25px'}}>
                    <Image src={image.url} style={{marginTop: '5vh'}}></Image>
                    <h1><b>{album.name}</b></h1>
                    <h2><b>{artist.name}</b></h2>
                     {/* https://youtu.be/eDw46GYAIDQ */}
                     <div className='rating'>
                            {[...Array(5)].map((note, i) =>{

                                const ratingScore = i + 1;

                                return(
                                    <label>
                                        <input type="radio" name="album-rating" value={ratingScore} 
                                        onClick={() => this.setState({ rating: ratingScore })}/>

                                        <IoMusicalNotesSharp className='music-note' size = "30"
                                        color={ratingScore <= (hover || rating) ? "red" : "grey"} 
                                        onMouseEnter={() => this.setState({ hover: ratingScore })}
                                        onMouseLeave={() => this.setState({ hover: 0 })}/>
                                    </label>
                                ) 
                            })}         
                        </div>  
                    <Container> 
                    {this.state.tracks.map(track => (
                    <Row key={track.id} style={{border: '2px solid black'}}>
                        {track.name} - {track.artists[0].name}
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
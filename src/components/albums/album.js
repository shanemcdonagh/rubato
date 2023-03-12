import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { IoMusicalNotesSharp } from "react-icons/io5";
import axios from "axios";

class Album extends Component {

    // Allows us to set an initial state for ratings
    // When backend is fully implemented, ratings will be saved to an album id
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            hover: 0
        };

        // Binding this keyword
        this.saveRating = this.saveRating.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/review/${this.props.album.id}`)
            .then((response) => {
                console.log(response.data);
                this.setState({ rating: response.data });
            })
            .catch((error) => {
                console.log(`Unexpected error: ${error}`);
            })
    }

    saveRating() {

        console.log(this.state.rating)

        const review = {
            albumID: this.props.album.id,
            artistName: this.props.album.artists[0].name,
            albumName: this.props.album.name,
            image: this.props.album.images[0].url,
            rating: this.state.rating,
            userID: localStorage.getItem('userID')
        }

        axios.post('http://localhost:4000/review', review)
            .then((response) => {
                console.log("Review added to profile:  " + response.data);
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server: " + error);
            })
    }

    render() {

        const { hover, rating } = this.state

        return (
            <Card
                bg="dark"
                text="danger"
                style={{ width: '18rem' }}
                className="mb-2" key={this.props.album.id}>
                <Card.Header>{this.props.album.artists[0].name}</Card.Header>
                <Card.Body>
                    <Card.Img src={this.props.album.images[0].url} />
                    <Card.Title>{this.props.album.name}</Card.Title>

                    {/* https://youtu.be/eDw46GYAIDQ */}
                    <div className='rating'>
                        {[...Array(5)].map((note, i) => {

                            const ratingScore = i + 1;

                            return (
                                <label>
                                    <input type="radio" name="album-rating" value={ratingScore}
                                        onClick={() => {
                                            this.setState({ rating: ratingScore }, () => {
                                                this.saveRating();
                                            });
                                        }} />

                                    <IoMusicalNotesSharp className='music-note' size="30"
                                        color={ratingScore <= (hover || rating) ? "red" : "grey"}
                                        onMouseEnter={() => this.setState({ hover: ratingScore })}
                                        onMouseLeave={() => this.setState({ hover: 0 })} />
                                </label>
                            )
                        })}
                    </div>
                    <NavLink to={"/album/?term=" + this.props.album.id}>
                        <Button variant="danger">View Album</Button>
                    </NavLink>
                </Card.Body>
            </Card>
        )
    }
}

export default Album;
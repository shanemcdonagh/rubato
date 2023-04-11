import React, { Component } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
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
            hover: 0,
            lists: [],
            setShow: false
        };

        // Binding this keyword
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveRating = this.saveRating.bind(this);
        this.saveDiaryEntry = this.saveDiaryEntry.bind(this);
    }

    componentDidMount() {
        axios.post('http://localhost:4000/review/getReview', { albumID: this.props.album.id, userID: localStorage.getItem('userID') })
            .then((response) => {
                this.setState({ rating: response.data });
            })
            .catch((error) => {
                console.log(`Unexpected error: ${error}`);
            })

        // Allows us to select a list to add the album to (MOVE THIS TO ALBUMS INSTEAD OF EACH INDIVIDUAL ALBUM)
        axios.post('http://localhost:4000/list/retrieveLists', { userID: localStorage.getItem("userID") })
            .then((response) => {
                this.setState({ lists: response.data })
                console.log(this.state.lists)
            })
            .catch((error) => {
                console.log("Cannot retrieve lists from server: " + error);
            });
    }

    handleClick() {
        this.setState(prevState => ({
            setShow: !prevState.setShow
        }));
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevents the default form submission

        const listID = event.target.elements.selectedList.value; // Retrieves the selected list ID from the form

        const album = {
            albumID: this.props.album.id,
            artistName: this.props.album.artists[0].name,
            albumName: this.props.album.name,
            image: this.props.album.images[0].url
        }

        const list = this.state.lists.find(list => list._id === listID);
        const listName = list.name;

        const diaryEntry = {
            album: this.props.album.name,
            artist: this.props.album.artists[0].name,
            isList: true,
            list: listName
        }

        axios.patch('http://localhost:4000/list/updateList', { userID: localStorage.getItem('userID'), listID, album: this.props.album })
            .then((response) => {
                this.saveDiaryEntry(diaryEntry); // Add to diary entry
                console.log("List updated, alongside diary entry:  " + response.data);
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server: " + error);
            })

        this.setState({ setShow: false }); // Closes the modal
    }

    saveDiaryEntry(entry) {
        const date = new Date().toLocaleDateString();

        var diaryEntry = `Reviewed ${entry.album} by ${entry.artist} with a rating of ${entry.rating} on ${date}`;
        const listEntry = `Added ${entry.album} by ${entry.artist} to ${entry.list} on ${date}`;

        if (entry.isList) {
            diaryEntry = listEntry
        }

        axios.post('http://localhost:4000/diary/createDiaryEntry', { diaryEntry, userID: localStorage.getItem("userID") })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
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

        const diaryEntry = {
            album: this.props.album.name,
            artist: this.props.album.artists[0].name,
            rating: this.state.rating,
            isList: false
        }

        axios.post('http://localhost:4000/review', review)
            .then((response) => {

                // Add to diary entry
                this.saveDiaryEntry(diaryEntry);

                console.log("Review added to profile alongside diary entry:  " + response.data);
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server: " + error);
            })
    }

    render() {

        const { hover, rating, setShow } = this.state
        const image = this.props.album.images[0] ? this.props.album.images[0].url : "https://via.placeholder.com/230x230.png?text=Artist+Image";
        const date = new Date(this.props.album.release_date);

        return (
            <div>
                <Card
                    bg="dark"
                    text="danger"
                    className="mb-2 album" key={this.props.album.id}>
                    <Card.Header>{this.props.album.artists[0].name}</Card.Header>
                    <Card.Body>
                        <Card.Img src={image} width="230.4px" height="230.4px" />
                        <Card.Title>{this.props.album.name} ({date.getFullYear()})</Card.Title>

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
                        <Button variant="danger" onClick={this.handleClick}>Add to List</Button>
                    </Card.Body>
                </Card>

                <Modal className="modal" show={setShow} onHide={this.handleClick} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add to list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.lists.length > 0 ?
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicList">
                                    <Form.Control as="select" name="selectedList" required>
                                        <option value="">Select a list</option>
                                        {this.state.lists.map((list) => (
                                            <option value={list._id}>{list.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="danger" type="submit">Submit</Button>
                            </Form>
                            :
                            <p>No lists available</p>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Album;
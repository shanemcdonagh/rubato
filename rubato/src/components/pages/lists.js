import React, { Component } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import ListenLists from "../listenlists/listenlists";
import Playlists from "../playlists/playlists";

// Lists will showcase all lists that have been created by a given user
class Lists extends Component {

    // Reference: https://www.geeksforgeeks.org/how-to-change-the-state-of-react-component-on-click/
    // Initial way of changing state from a button click was causing the website to slow to a halt
    // This solution fixes this problem in particular
    constructor(props) {
        super(props);
        this.state = {
            setShow: false,
            newListName: '',
            lists: [],
            listLength: 0,
            isLoading: true
        };

        // Binding this keyword
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateListLength = this.updateListLength.bind(this);
        this.handleNewListNameChange = this.handleNewListNameChange.bind(this);
    }

    componentDidMount() {
        axios.post('http://localhost:4000/list/retrieveLists', { userID: localStorage.getItem("userID") })
            .then((response) => {
                this.setState({
                    lists: response.data,
                    listLength: response.data.length
                })
                console.log(this.state.listLength)
            })
            .catch((error) => {
                console.log("Cannot retrieve lists from server: " + error);
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        const newListName = this.state.newListName.trim();

        if (!newListName) {
            return;
        }

        axios.post('http://localhost:4000/list/createList', { name: newListName, userID: localStorage.getItem("userID") })
            .then((response) => {
                console.log("List added to account: " + response.data);

                // Append the new list to the existing list of lists and update length of list
                const newLists = [...this.state.lists, response.data];
                this.setState({ lists: newLists });
                this.updateListLength(this.state.listLength + 1);
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server: " + error);
            });

        // Close the modal and reset the form state
        this.setState({ newListName: '', setShow: false });
    }

    handleClick() {
        this.setState(prevState => ({
            setShow: !prevState.setShow
        }));
    }

    updateListLength = (newLength) => {
        this.setState({ listLength: newLength });
    }

    handleNewListNameChange(event) {
        this.setState({ newListName: event.target.value });
    }

    render() {
        const { setShow, newListName, lists, listLength } = this.state;

        return (
            <div className="list-content">
                <h2 className="listMessage"><b>LISTS</b></h2>
                {listLength === 0 ? (
                    <div className="noLists">
                        <h2>No lists exist yet, need ideas?</h2>
                        <h3 className="playlist-descriptor">See these playlists for inspiration</h3>
                        <div className="listButton">
                            <Button variant="danger" onClick={this.handleClick}>Create a list</Button>
                        </div>
                        <div className="playlists">
                            <Playlists />
                        </div>
                    </div>) : (
                    <div>
                        <ListenLists lists={lists} updateListLength={this.updateListLength} />
                        <div className="listButton">
                            <Button variant="danger" onClick={this.handleClick}>Create a list</Button>
                        </div>
                        {listLength < 10 && (
                            <div className="playlists">
                                <h3 className="playlist-descriptor">See these playlists for inspiration</h3>
                                <Playlists />
                            </div>
                        )}
                    </div>)}

                <Modal className="modal" show={setShow} onHide={this.handleClick} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title center>Create a new list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Form - To allow us to add to the collection of lists that a user may have */}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicList">
                                <Form.Label>List</Form.Label>
                                <Form.Control placeholder="New list name"
                                    value={newListName}
                                    onChange={this.handleNewListNameChange}
                                />
                            </Form.Group>
                            <Button variant="danger" type="submit">Submit</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

// Export for use in App.js
export default Lists;
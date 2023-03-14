import React, { Component } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import ListenLists from "../listenlists/listenlists";

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
            lists: []
        };

        // Binding this keyword
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewListNameChange = this.handleNewListNameChange.bind(this);
    }

    componentDidMount() {
        axios.post('http://localhost:4000/retrieveLists', { userID: localStorage.getItem("userID") })
            .then((response) => {
                this.setState({ lists: response.data })
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

        axios.post('http://localhost:4000/createList', { name: newListName, userID: localStorage.getItem("userID") })
            .then((response) => {
                console.log("List added to account: " + response.data);

                // Append the new list to the existing list of lists
                const newLists = [...this.state.lists, response.data];
                this.setState({ lists: newLists });
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

    handleNewListNameChange(event) {
        this.setState({ newListName: event.target.value });
    }

    render() {
        const { setShow, newListName, lists } = this.state;

        return (
            <div className="list-content">
                {lists.length === 0 ? (
                    <div>
                        <h1>No lists exist yet</h1>
                    </div>) : (
                    <div>
                        <ListenLists lists={lists}></ListenLists>
                    </div>)}


                <div className="listButton">
                    <Button variant="danger" onClick={this.handleClick}>Create a list</Button>
                </div>

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
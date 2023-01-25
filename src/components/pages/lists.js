import React, { Component } from "react";
import {Modal, Button, Form} from 'react-bootstrap';

// Lists will showcase all lists that have been created by a given user
class Lists extends Component {

    // Reference: https://www.geeksforgeeks.org/how-to-change-the-state-of-react-component-on-click/
    // Initial way of changing state from a button click was causing the website to slow to a halt
    // This solution fixes this problem in particular
    constructor(props) {
        super(props);
        this.state = {
            setShow: false
        };

        // Binding this keyword
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        if(!this.state.setShow)
        {
            this.setState({ setShow: true })
        }
        else
        {
            this.setState({ setShow: false })
        }     
    }

    render() {
        return (
            <div className="content">
                 <div className="listButton">
                    <Button variant="danger" onClick={this.handleClick}>Create a list</Button>
                 </div>
               
                <Modal className="modal" show={this.state.setShow} onHide={this.handleClick} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title center>Create a new list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Form - To allow us to add to the collection of lists that a user may have */}
                        <Form.Group className="mb-3" controlId="formBasicList">
                            <Form.Label>List</Form.Label>
                            <Form.Control placeholder="New list name" />
                        </Form.Group>
                        <Button variant="danger" type="submit">Submit</Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

// Export for use in App.js
export default Lists;
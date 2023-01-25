import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

// Lists will showcase all lists that have been created by a given user
class Lists extends Component {

    // Reference: https://react-bootstrap.github.io/components/modal/
    // Allows us to add a new list to our lists page
    // [show, setShow]  useState(false);
    // handleClose = () => setShow(false);
    // handleShow = () => setShow(true);
     // https://reactjs.org/docs/hooks-state.html
    // Initially ensures search value and card values are empty
    constructor(props) {
        super(props);
        this.state = {
            setShow: false
        };

        // Binding this keyword
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        // Changing state
        this.setState({setShow : true})
    }

    render() {
        return (<div className="content">
            <p>This is the Lists Page (where albums you want to listen later and organise are)</p>
            <Button variant="danger" onClick={this.handleClick}>Create a list</Button>
            </div>
        );
    }
}

// Export for use in App.js
export default Lists;
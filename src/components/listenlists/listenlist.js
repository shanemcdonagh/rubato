import React, { Component } from 'react';
import axios from "axios";
import { Container, Row, Col, Button } from 'react-bootstrap';

class ListenList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleted: false
        };
    }

    // Method - Removes list based on its id
    DeleteList() {

        //REF: https://www.w3schools.com/jsref/met_win_confirm.asp
        if (window.confirm("Are you sure you want to remove this list?") === true) {

            axios.patch("http://localhost:4000/deleteList/", { name: this.props.list.name, userID: localStorage.getItem("userID") })
                .then((response) => {
                    // If successful, set deleted state to true
                    this.setState({ deleted: true });
                    console.log(response);
                })
                .catch((error) => {
                    console.log("Cannot remove list from server: " + error);
                });
        }
    }

    render() {
        // If the list has been deleted, don't render the component
        if (this.state.deleted) {
            return null;
        }
        
        return (
            <div>
                {/* Props - Accesses data passed as a property to current component */}
                <Container className='container-fluid'>
                    <hr />
                    <Row className="row">
                        <Col>
                            <p>Name</p>
                            <h3>{this.props.list.name}</h3>
                        </Col>
                        <Col>
                            <p>Albums</p>
                            <h3>{this.props.list.albums.length}</h3>
                        </Col>

                        <Col>
                            <Button variant="danger" onClick={() => { this.DeleteList() }}>Delete List</Button>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            </div>
        )
    }
}

export default ListenList;
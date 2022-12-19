import React, { Component } from "react";
import { FormControl, Card, Row, Container, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from "axios";


class Search extends Component {
    // https://reactjs.org/docs/hooks-state.html
    // Initially ensures search value and card values are empty
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            albums: []
        };
    }

    search() {
        axios.get('http://localhost:4000/search/' + this.state.search)
            .then((response) => {
                this.state.albums = response.data;
                console.log(this.state.albums)
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server");
            })
    }

    render() {
        return (<div>
            <InputGroup className="mb-3" size="lg" style={{ marginTop: '5vh', marginLeft: '50vh' }}>
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onKeyDown={event => {
                        if (event.key == "Enter") {
                            this.search();
                        }
                    }}
                    // When the value of the form changes, update the value of the search field
                    onChange={event => this.setState({ search: event.target.value })}
                />
                <Button variant="outline-danger" onClick={() => { this.search() }}>Search</Button>
            </InputGroup>
            <div className="content">
                <Container>
                    <Row className="mx-2 row row-col-4">
                        {albums.map((album, i) => {
                            <Card
                                bg="dark"
                                text="danger"
                                style={{ width: '18rem' }}
                                className="mb-2">
                                <Card.Header>Artist</Card.Header>
                                <Card.Body>
                                    <Card.Title></Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        })}
                    </Row>
                </Container>
            </div>
        </div>
        );
    }
}

// Export for use in App.js
export default Search;
import React, { Component } from "react";
import { FormControl, Card, Row, Container, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


class Search extends Component {
    // https://reactjs.org/docs/hooks-state.html
    // Initially ensures search value is empty
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
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
                        console.log("Hey")
                    }}
                    // When the value of the form changes, update the value of the search field
                    onChange={event => this.setState({ search: event.target.value })}
                />
                <Button variant="outline-danger" onClick={() => { console.log("Button click") }}>Search</Button>
            </InputGroup>
            <div className="content">
                <Container>
                    <Row className="mx-2 row row-col-4">
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
                    </Row>
                </Container>
            </div>
        </div>
        );
    }
}

// Export for use in App.js
export default Search;
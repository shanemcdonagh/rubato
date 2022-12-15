import React, { Component } from "react";
import { Navbar, FormControl, Card, Row, Container, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


class Search extends Component {
    render() {
        return (<div className="content">
                <InputGroup className="mb-3" size="lg">
                <FormControl
                  style={{ marginLeft: "45%" }}
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onKeyDown={event => {
                    console.log("Hey")
                  }}
                />
                <Button variant="outline-danger">Search</Button>
                </InputGroup>
                
            <p>This is the Search Page (where users can retrieve artists and albums)</p></div>
        );
    }
}

// Export for use in App.js
export default Search;
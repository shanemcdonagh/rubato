// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Album from './album';


// Class Plants - Extends Component class
class CategoryAlbums extends Component {

    constructor(props) {
        super(props);
        this.state = {
          albums: []
        };
      }

    // Method: Called first when component is mounted into view
    componentDidMount(){

        // Reference: https://herewecode.io/blog/react-get-url-params/
        // Allows to retrieve the albumId from the url parameters
        const queryParameters = new URLSearchParams(window.location.search)
        const term = queryParameters.get("term")

        // // Promise - Result of an asynchronous operation
        // // Axios - Promise based HTTP client
        axios.get('http://localhost:4000/categories/albums' + term)
            .then((response) => {
                this.setState({albums: response.data})
                console.log(this.state.albums)
            })
            .catch((error) => {
                console.log("Cannot retrieve information from server " + error);
            })
    }

    // Method - Visual content of the component
    render() {
        return (
            <div className='content'>
                <Container>
                <Row className="mx-2 row row-col-4">
                    {this.props.albums.map((album) => {
                        return <Album album={album} key={album.id}></Album>;
                    })}
                </Row>
            </Container>
            </div>
            
        );
    }
}

export default Albums;
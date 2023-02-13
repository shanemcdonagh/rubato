import React, { Component } from "react";
import {Image, Button, Container, Modal, Form} from "react-bootstrap";
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            setShow: false,
            profilePic: ''
        };

        // Binding this keyword
        this.handleClick = this.handleClick.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleImageChange(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            profilePic: reader.result
          });
        };
    
        reader.readAsDataURL(file);
      }
    
      handleSubmit(e){
        e.preventDefault();
        // Upload the file to a server or do whatever we need to do with the file here
        console.log('File uploaded:', this.state.profilePic);
      }
    
    
    render() {

        const {setShow} = this.state

        let { profilePic } = this.state;
        let $profilePicPreview = null;

        if (profilePic)
        {
            $profilePicPreview = <Image src={profilePic} width="150px" roundedCircle/>;
        } 
        else 
        {
            $profilePicPreview = <Image src="http://groovesharks.org/assets/images/default_avatar.jpg" width="150px" roundedCircle/>;
        }

        return (
        <div className="content">
            <div className="profile">
                <div style={{ display: 'grid',  justifyContent: "center"}}>
                    <Container style={{backgroundColor: '#2f302f', justifyItems: 'grid'}}>
                        {$profilePicPreview} 
                        <p>Shane McDonagh</p>
                        <Button variant="danger" onClick={this.handleClick}>Edit Profile</Button>
                    </Container>           
                </div>

                <Modal className="modal" show={setShow} onHide={this.handleClick} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title center>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Form - To allow us to add to the collection of lists that a user may have */}
                        <Form onSubmit={this.handleSubmit}> 
                            <Form.Group className="mb-3" controlId="formBasicList">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="file" size="sm" onChange={this.handleImageChange}/>
                            </Form.Group>
                            <Button variant="danger" value={profilePic} type="submit">Submit</Button>
                        </Form>       
                    </Modal.Body>
                </Modal>
            </div>
        </div>
        )
    }
}

// Export for use in App.js
export default Profile;
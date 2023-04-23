import React, { Component } from "react";
import { Image, Button, Container, Modal, Form } from "react-bootstrap";
import axios from "axios";
import StyledHeader from "../../styling/Header";
import ReviewedAlbums from "../reviewed/reviewed-albums";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      reviews: [],
      showEditPictureModal: false,
      newPictureUrl: "",
      newPictureFile: null
    };

    this.handleEditPicture = this.handleEditPicture.bind(this);
    this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
    this.handlePictureFileChange = this.handlePictureFileChange.bind(this);
    this.handleCancelPictureEdit = this.handleCancelPictureEdit.bind(this);
    this.handleSavePicture = this.handleSavePicture.bind(this);
  }

  componentDidMount() {
    axios.post("/user/userDetails", {
        userID: localStorage.getItem("userID")
      })
      .then(response => {
        this.setState({
          userDetails: response.data
        });
        console.log(this.state.userDetails);
      })
      .catch(error => {
        console.log("Cannot retrieve user data from server: " + error);
      });
  }

  handleEditPicture() {
    this.setState({ showEditPictureModal: true });
  }

  handlePictureUrlChange(event) {
    this.setState({ newPictureUrl: event.target.value });
  }

  handlePictureFileChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = e => {
      this.setState({
        newPictureFile: file,
        newPictureUrl: e.target.result
      });
    };

    reader.readAsDataURL(file);
  }

  handleCancelPictureEdit() {
    this.setState({
      showEditPictureModal: false,
      newPictureUrl: "",
      newPictureFile: null
    });
  }

  handleSavePicture() {
    const { newPictureFile } = this.state;

    const reader = new FileReader();
    reader.readAsDataURL(newPictureFile);
    reader.onload = () => {
      axios
        .patch(`/user/updateProfilePicture`, {
          userID: localStorage.getItem("userID"),
          image: reader.result
        })
        .then(response => {
          this.setState({
            userDetails: response.data,
            showEditPictureModal: false,
            newPictureUrl: "",
            newPictureFile: null
          });
        })
        .catch(error => {
          console.log("Cannot update user data: " + error);
        });
    };
  }

  render() {
    const { userDetails, showEditPictureModal, newPictureUrl } = this.state;

    return (
      <div className="content">
        <div className="profile">
          <StyledHeader type="user" className="header">
            <div>
              <div>
                <div className="header__overline profileName">Profile</div>
                <h1 className="username">{userDetails.name}</h1>
                <Image
                src={userDetails.image}
                width="150px"
                className="profileImage"
              />
              <div>
                <Button variant="danger" className="editImage" onClick={this.handleEditPicture}>
                    Edit picture
                </Button>
              </div>
              </div>
            </div>
          </StyledHeader>
        </div>
        <Modal show={showEditPictureModal} onHide={this.handleCancelPictureEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit profile picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="pictureUrl">
                <Form.Label>Upload new picture</Form.Label>
                <Form.Control type="file" onChange={this.handlePictureFileChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCancelPictureEdit}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSavePicture}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="reviewed">
           <ReviewedAlbums/>
        </div>
      </div>
    )
  }
}

// Export for use in App.js
export default Profile;
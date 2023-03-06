import React, { Component } from "react";
import {Image, Button, Container, Modal, Form} from "react-bootstrap";
import StyledHeader from "../../styling/Header";
import styled from 'styled-components/macro';

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
            <StyledHeader type="user">
            <div className="header__inner">
                {$profilePicPreview} 
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">Shane McDonagh</h1>
                <p className="header__meta">
                  <span>
                    0 Reviews
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
            </div>
        </div>
        )
    }
}

// Export for use in App.js
export default Profile;
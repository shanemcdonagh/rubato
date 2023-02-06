import React, { Component } from "react";
import {Image, Button} from "react-bootstrap";
class Profile extends Component {
    render() {
        return (
        <div className="content">
            <div className="profile">
                <div style={{ display: 'grid',  justifyContent: "center"}}>
                    <Image src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" width="150px" roundedCircle/> 
                    <Button variant="danger">Edit Profile</Button>               
                </div>
            </div>
        </div>
        )
    }
}

// Export for use in App.js
export default Profile;
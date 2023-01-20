import React, { Component } from "react";
import Image from "react-bootstrap/Image";

class Profile extends Component {
    render() {
        return (
        <div className="content">
            <p>This is the Profile Page (where user information will be displayed)</p>
            <div>
            <Image src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" width="150px" roundedCircle/>                
            {/* https://mdbcdn.b-cdn.net/img/new/avatars/8.webp */}
            </div>
        </div>
        );
    }
}

// Export for use in App.js
export default Profile;
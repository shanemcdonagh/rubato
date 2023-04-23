import React, { Component } from "react";
import styled from 'styled-components/macro';

import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBContainer,
    CDBIcon
} from 'cdbreact';

import { NavLink } from "react-router-dom";

const StyledLoginButton = styled.a`
  background-color: red;
  color: white;
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
`;

// https://www.devwares.com/docs/contrast/react/navigation/sidebar/

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.removeItem('token');
        this.props.updateLoginState(false);
    };

    render() {
        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <CDBSidebar textColor="#fff" backgroundColor="#000000">
                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu style={{ paddingTop: '25%' }} className="nav">
                            <NavLink to="/search">
                                <CDBSidebarMenuItem icon="search">Search</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink to="/">
                                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink to="/lists">
                                <CDBSidebarMenuItem icon="list">Lists</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink to="/diary">
                                <CDBSidebarMenuItem icon="pen">Diary</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink to="/profile">
                                <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                            </NavLink>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                    <CDBSidebarFooter style={{ textAlign: 'center', marginBottom: '10vh' }}>
                        <StyledLoginButton onClick={this.handleLogout}>
                            Logout
                        </StyledLoginButton>
                    </CDBSidebarFooter>
                </CDBSidebar>
            </div>
        );
    }
}

export default Sidebar;

import { Component } from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBContainer,
    CDBIcon
} from 'cdbreact';

import { NavLink } from "react-router-dom";

//https://www.devwares.com/docs/contrast/react/navigation/sidebar/

class Sidebar extends Component {
    render() {
        return (<div style={{ display: 'flex', height: '100vh' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#000000">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src='./simplelogo.png' width="30px" alt='fulllogo' />
                        <h6 className="ml-2">Rubito</h6>
                    </div>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/lists" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="list">Lists</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/diary" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="pen">Diary</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/profile" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        <CDBContainer>
                            <CDBIcon fab icon="facebook" size="lg" />
                            <CDBIcon fab icon="twitter" size="lg" />
                            <CDBIcon fab icon="instagram" size="lg" />
                        </CDBContainer>
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
        );
    }
}

export default Sidebar;

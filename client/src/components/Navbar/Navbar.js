import React, {Component} from "react";
import { Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap';
import {AuthButton} from "../Login" 
import "./Navbar.css";
class NavBar extends Component {
  render(){
    
    return(
      <div >
        <Navbar id="nav-bar" collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              
              <img width="150px" height="150px" src="images/logo.png" alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse >
            <Nav>
              <NavItem eventKey={1} href="/">
                about
              </NavItem>
              <NavItem eventKey={2} href="/dogsearch">
                search
              </NavItem>
              <NavItem eventKey={3} href="/gallery">
                gallery
              </NavItem>
              
              <NavDropdown eventKey={5} title="admin" id="basic-nav-dropdown">
                <NavItem eventKey={5.1} href="/addrating">
                  login
                </NavItem>
                <NavItem eventKey={5.2} href="/signup">
                  sign up
                </NavItem>
                <NavItem eventKey={5.3} href="/animals">
                  administrator
                </NavItem>
              </NavDropdown>
              <NavItem eventKey={6} href="/contact">
                contact us
              </NavItem>
              <NavItem eventKey={7} href="/quickstart">
                quick start
              </NavItem>
              <NavItem eventKey={8}>
                <AuthButton />
              </NavItem>
              
            </Nav>
            <Nav pullRight />
          </Navbar.Collapse>
        </Navbar>
        
    </div>
        )
    }
}
export default NavBar;
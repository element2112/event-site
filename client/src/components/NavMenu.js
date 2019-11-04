import React from "react";
import "../styles/App.css";
import "../styles/NavMenu.css";
import {Navbar, NavDropdown, Form, FormControl, Button, NavItem, Nav, Container} from "react-bootstrap";


class NavMenu extends React.Component {
  state = {
    isSuperAdmin: true
  }

  checkIfSuperAdmin = () => {
    this.setState({isSuperAdmin: true});
  }

  render() {
    return (
      <Container fluid="true" className="px-0 nav-menu">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Event It</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {this.state.isSuperAdmin ?
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end ">
            <Nav>
              <Nav.Link href="/events">Events</Nav.Link>
              <Nav.Link href="/rsos">RSOs</Nav.Link>
              <Nav.Link href="/eventApprovals">Event Approvals</Nav.Link>
              <Nav.Link href="/rsoApprovals">RSO Approvals</Nav.Link>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse> : 
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="#home">Events</Nav.Link>
              <Nav.Link href="#link">RSOs</Nav.Link>
              <Nav.Link href="#link">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          }
        </Navbar>
      </Container>
    )
  }
};

export default NavMenu;

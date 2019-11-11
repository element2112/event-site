import React from "react";
import "../styles/App.css";
import "../styles/NavMenu.css";
import {Navbar, Nav, Container} from "react-bootstrap";

const headers = {
  "Content-Type": "application/json",
}

class NavMenu extends React.Component {
  state = {
    isSuperAdmin: false,
    userId: localStorage.getItem("user_id")
  }

  componentDidMount() {
    this.checkIfSuperAdmin();
    console.log(this.props)
  }

  checkIfSuperAdmin = () => {
    fetch("http://localhost:4000/api/users/superadmins/" + this.state.userId, {
        method: "GET",
        headers: headers,
    })
        .then((res) => res.json())
        .then((res) => {
            if (res[0].user_id != undefined) {
              this.setState({isSuperAdmin: true});
            } else throw res
        })
        .catch((res) => {
            console.log(res);
        })
  }

  logout = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("uni_id");
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
              <Nav.Link href="/" onClick={() => this.logout()}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse> : 
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/events">Events</Nav.Link>
              <Nav.Link href="/rsos">RSOs</Nav.Link>
              <Nav.Link href="/" onClick={() => this.logout()}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          }
        </Navbar>
      </Container>
    )
  }
};

export default NavMenu;

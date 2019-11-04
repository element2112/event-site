import React from 'react';
import { Redirect } from 'react-router';
import {Card, Col, Row, Button, Form, Dropdown} from "react-bootstrap";
import "../styles/Home.css";
import "../styles/App.css";

class HomeCard extends React.Component {

  state = {
    showLoginCard: true,
    showRegisterSACard: false,
    universities: ["UCF", "FSU", "USF"],
    authenticated: false
  }

  toggleRegisterCard = () => {
    this.setState({showLoginCard: !this.state.showLoginCard, showRegisterSACard: false});
  }

  toggleRegisterSACard = () => {
    this.setState({showLoginCard: false, showRegisterSACard: true});
  }

  onLogin = (e) => {
    e.preventDefault();

    this.setState({authenticated: true});
    return false;
  }

  render () {
    const universities = this.state.universities.map((uni, index) => {
      return (
      <Dropdown.Item href="#/action-1">{uni}</Dropdown.Item>
      )
    })

    if(this.state.authenticated) {
      return (<Redirect to="/events" />)
    } else {

    return (
        <Row>
        <Col md={{ span: 6, offset: 3 }}>
          
            {this.state.showLoginCard ? 
            
              <Card className="home-card">
                <Card.Header as="h2" className="home-card-color text-center" id="home-card-header">LOGIN</Card.Header>
                <Card.Body className="home-card-color">
                  <Form onSubmit={this.onLogin}>
                    <Form.Group controlId="form-basic-email">
                      <Form.Control type="email" placeholder="Email" className="home-input"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-password">
                      <Form.Control type="password" placeholder="Password" className="home-input"></Form.Control>
                    </Form.Group>
                    <Button size="lg" block className="home-button home-input" type="submit">
                      LOGIN
                    </Button>
                    <Card.Link href="#" className="home-link" onClick={this.toggleRegisterCard}>New to Event It? Create an account.</Card.Link>
                  </Form>
                </Card.Body> 
              </Card>
            : !this.state.showRegisterSACard ?
            <Card className="home-card" id="home-register-card">
                <Card.Header as="h2" className="home-card-color text-center" id="home-card-header">Register</Card.Header>
                <Card.Body className="home-card-color">
                  <Form>
                    <Form.Group controlId="form-basic-email">
                      <Form.Control type="email" placeholder="Email" className="home-input home-register-input"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-first-name">
                      <Form.Control type="input" placeholder="First Name" className="home-input home-register-input"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-last-name">
                      <Form.Control type="input" placeholder="Last Name" className="home-input home-register-input"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-password">
                      <Form.Control type="password" placeholder="Password" className="home-input home-register-input"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-confirm-password">
                      <Form.Control type="password" placeholder="Confirm Password" className="home-input home-register-input"></Form.Control>
                    </Form.Group>
                    <Button size="lg" block className="home-button home-input" type="submit" id="home-register-button">
                      REGISTER
                    </Button>
                    <Card.Link href="#" className="home-link" onClick={this.toggleRegisterCard}>Already an Event It member? Sign in.</Card.Link>
                    <Card.Link href="#" className="home-link" onClick={this.toggleRegisterSACard}><br/>Registering a college? Click here.</Card.Link>
                  </Form>
                </Card.Body> 
            </Card> : 
            <Card className="home-card" id="home-register-card">
            <Card.Header as="h2" className="home-card-color text-center" id="home-card-header">Register</Card.Header>
            <Card.Body className="home-card-color">
              <Form>
                <Form.Group controlId="form-basic-email">
                  <Form.Control type="email" placeholder="Email" className="home-input home-register-input"></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-first-name">
                  <Form.Control type="input" placeholder="First Name" className="home-input home-register-input"></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-last-name">
                  <Form.Control type="input" placeholder="Last Name" className="home-input home-register-input"></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-password">
                  <Form.Control type="password" placeholder="Password" className="home-input home-register-input"></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-confirm-password">
                  <Form.Control type="password" placeholder="Confirm Password" className="home-input home-register-input"></Form.Control>
                </Form.Group>
                <Dropdown>
                  <Dropdown.Toggle block id="dropdown-basic" className="home-dropdown">
                    Select School
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {universities}
                  </Dropdown.Menu>
                </Dropdown>
                <Button size="lg" block className="home-button home-input" type="submit" id="home-register-button">
                  REGISTER
                </Button>
                <Card.Link href="#" className="home-link" onClick={this.toggleRegisterCard}>Already an Event It member? Sign in.</Card.Link>
              </Form>
            </Card.Body> 
        </Card>} 
        </Col>
        </Row>
    )}
  }
}

export default HomeCard;
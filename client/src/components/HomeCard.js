import React from 'react';
import { Redirect } from 'react-router';
import {Card, Col, Row, Button, Form, Dropdown} from "react-bootstrap";
import "../styles/Home.css";
import "../styles/App.css";

const headers = {
  "Content-Type": "application/json",
}

class HomeCard extends React.Component {
  

  state = {
    showLoginCard: true,
    showRegisterSACard: false,
    universities: [],
    authenticated: false,
    email: "",
    first_name: "",
    last_name: "",
    password1: "",
    password2: "",
    uni_name: "",
    uni_address: "",
    uni_domain: "",
    uni_id: null
  }

  componentDidMount() {
    this.getUnis();
  }

  toggleRegisterCard = () => {
    this.setState({showLoginCard: !this.state.showLoginCard, showRegisterSACard: false});
  }

  toggleRegisterSACard = () => {
    this.setState({showLoginCard: false, showRegisterSACard: true});
  }

  onChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  onLogin = (e) => {
    e.preventDefault();

    this.setState({authenticated: true});
    return false;
  }

  //------------------ API calls ----------------------//
  registerUni = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/university/registeruni", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: this.state.uni_name,
            address: this.state.uni_address,
            email_domain: this.state.uni_email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password1
        })
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              this.setState({authenticated: true});
              localStorage.setItem("user_id", res.user_id);
              localStorage.setItem("uni_id", res.uni_id);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  register = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/users/registeruser", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password1,
            uni_id: this.state.uni_id
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res) {
          this.setState({authenticated: true});
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("uni_id", res.uni_id);
        } else throw res
    })
    .catch((res) => console.log(res))
  }

  login = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password1
        })
    })
        .then((res) => res.json())
        .then((res) => {
          if (res[0].user_id != undefined) {
            this.setState({authenticated: true});
            localStorage.setItem("user_id", res[0].user_id);
            localStorage.setItem("uni_id", res[0].uni_id);
          } else throw res
        })
        .catch((res) => console.log(res))
  }

  getUnis = () => {
    fetch("http://localhost:4000/api/university/getunis", {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              const unis = [];
              res.forEach(uni => {
                unis.push({name: uni.name, id: uni.uni_id})
              });
              this.setState({universities: unis});
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  //------------------ render ----------------------//
  render () {
    const universities = this.state.universities.map((uni, index) => {
      return (
      <option value={uni.id}>{uni.name}</option>
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
                  <Form onSubmit={this.login}>
                    <Form.Group controlId="form-basic-email">
                      <Form.Control type="email" placeholder="Email" className="home-input" name="email" name="email" onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-password">
                      <Form.Control type="password" placeholder="Password" className="home-input" name="password1" name="password1" onChange={this.onChange}></Form.Control>
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
                  <Form onSubmit={this.register}>
                    <Form.Group controlId="form-basic-email">
                      <Form.Control type="email" placeholder="Email" className="home-input home-register-input" name="email" onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-first-name">
                      <Form.Control type="input" placeholder="First Name" className="home-input home-register-input" name="first_name" onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-last-name">
                      <Form.Control type="input" placeholder="Last Name" className="home-input home-register-input" name="last_name" onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-password">
                      <Form.Control type="password" placeholder="Password" className="home-input home-register-input" name="password1" onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-confirm-password">
                      <Form.Control type="password" placeholder="Confirm Password" className="home-input home-register-input" name="password2" onChange={this.onChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="form-basic-uni-select">
                      <Form.Control as="select" className="home-dropdown" onChange={this.onChange} name="uni_id">
                      <option value="" disabled selected>Select University</option>
                        {universities}
                      </Form.Control>
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
                  <Form.Control type="email" placeholder="Email" className="home-input home-register-input" name="email" onChange={this.onChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-first-name">
                  <Form.Control type="input" placeholder="First Name" className="home-input home-register-input" name="first_name" onChange={this.onChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-last-name">
                  <Form.Control type="input" placeholder="Last Name" className="home-input home-register-input" name="last_name" onChange={this.onChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-password">
                  <Form.Control type="password" placeholder="Password" className="home-input home-register-input" name="password1" onChange={this.onChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-confirm-password">
                  <Form.Control type="password" placeholder="Confirm Password" className="home-input home-register-input" name="password2" onChange={this.onChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-college-name">
                  <Form.Control type="input" placeholder="University Name" className="home-input home-register-input" name="uni_name" onChange={this.onChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-college-address">
                  <Form.Control type="input" placeholder="University Address" className="home-input home-register-input" name="uni_address" onChange={this.onChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="form-basic-college-email">
                  <Form.Control type="input" placeholder="University Email Domain" className="home-input home-register-input" name="uni_email" onChange={this.onChange}></Form.Control>
                </Form.Group>
                
                <Button size="lg" block className="home-button home-input" type="submit" id="home-register-button" onClick={this.registerUni}>
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
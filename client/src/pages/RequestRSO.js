import React from 'react';
import {Col, Row, Container, Button, Form} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

const headers = {
  "Content-Type": "application/json",
}

class RequestRSO extends React.Component {

  state = {
    rsoName: "",
    students: []
  }

  //------------------ API calls ----------------------//
  requestRso = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/rso/addrso", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: this.state.rsoName,
            uni_id: localStorage.getItem("uni_id")
            // members
        })
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              this.setState({authenticated: true});
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  //------------------ Render ----------------------//
  render () {
    const form = (
      <Form>
        <Form.Group controlId="form-basic-rso-name">
          <Form.Control type="text" placeholder="RSO Name" className="home-input"></Form.Control>
        </Form.Group>
        <Form.Group controlId="form-basic-rso-students">
          <Form.Control as="textarea" placeholder="Add 5 students" className="home-textarea" rows="10"></Form.Control>
        </Form.Group>
        <Button size="md" type="submit" className="request-btn">
          REQUEST
        </Button>
      </Form>
    )
    
    return (
      <Container fluid={true} className="px-0 page">
        <NavMenu />
        <Row>
          <Col>
            <BackgroundCard title="Request RSO" items={form}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RequestRSO;
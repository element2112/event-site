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

    console.log(this.state.students.split(" "))
    console.log(this.state.rsoName)

    const members = this.state.students.split(" ");

    if(members.length < 5) {
      alert("Please enter at least 5 student emails");
      return;
    }
      

    fetch("http://localhost:4000/api/rso/requestrso", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: this.state.rsoName,
            members: members,
            uni_id: localStorage.getItem("uni_id")
        })
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              alert("Requested")
            } else throw res
        })
        .catch((res) => console.log(res))
  }


  onChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  //------------------ Render ----------------------//
  render () {
    const form = (
      <Form onSubmit={this.requestRso}>
        <Form.Group controlId="form-basic-rso-name">
          <Form.Control type="text" required placeholder="RSO Name" className="home-input" name="rsoName" onChange={this.onChange}></Form.Control>
        </Form.Group>
        <Form.Group controlId="form-basic-rso-students">
          <Form.Label>Write student emails separated by a space</Form.Label>
          <Form.Control as="textarea" required placeholder="Add at least 5 students" className="home-textarea" rows="10" name="students" onChange={this.onChange}></Form.Control>
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
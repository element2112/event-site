import React from 'react';
import {Col, Row, Container, Button, Form, FormGroup, Dropdown} from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import Calendar from "react-calendar";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

class RequestEvent extends React.Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render () {
    const form = (
      <Form>
        <Form.Group controlId="form-basic-event-name">
          <Form.Control type="text" placeholder="Event Name" className="home-input"></Form.Control>
        </Form.Group>
        <Form.Group controlId="form-basic-event-description">
          <Form.Control as="textarea" placeholder="Event Description" className="home-textarea" rows="10"></Form.Control>
        </Form.Group>
        <FormGroup controlId="form-basic-event-category">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Other</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Sport</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Academic</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </FormGroup>
        <FormGroup controlId="form-basic-event-category">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Access Level
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Private</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Public</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </FormGroup>
        <FormGroup controlId="form-basic-date">
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        </FormGroup>
        <FormGroup controlId="form-basic-start-time">
         <TimePicker start="10:00" end="21:00" step={30} />
        </FormGroup>
        <FormGroup controlId="form-basic-end-time">
         <TimePicker start="10:00" end="21:00" step={30} />
        </FormGroup>
        <FormGroup controlId="form-basic-event-location">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Location
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Student Union</Dropdown.Item>
              <Dropdown.Item href="#/action-2">CB2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </FormGroup>
        <Form.Group controlId="form-basic-event-loc">
          <Form.Control type="text" placeholder="Location Name" className="home-input"></Form.Control>
        </Form.Group>
        <Form.Group controlId="form-basic-event-phone">
          <Form.Control type="text" placeholder="Contact Phone Number" className="home-input"></Form.Control>
        </Form.Group>
        <Form.Group controlId="form-basic-event-email">
          <Form.Control type="email" placeholder="Contact Email" className="home-input"></Form.Control>
        </Form.Group>
        <Button size="md" type="submit">
          REQUEST
        </Button>
      </Form>
    )
    
    return (
      <Container fluid={true} className="px-0 page">
        <NavMenu />
        <Row>
          <Col>
            <BackgroundCard title="Request Event" items={form}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RequestEvent;
import React from 'react';
import {Col, Row, Container, Button, Form, FormGroup, Dropdown} from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

class RequestEvent extends React.Component {
  state = {
    startDate: new Date(),
    isAdmin: false
  };

  componentDidMount() {
   // this.checkIsAdmin();
  }
  
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  checkIsAdmin = () => {
    this.setState({isAdmin: true});
  }

  render () {
    const datePicker = <DatePicker selected={this.state.startDate} onChange={this.handleChange} className="event-date-btn"/>

    const form = (
      <Form style={{display: "flex"}}>
        <div style={{display: "inline-block", flex: "1", paddingRight: "20px"}}>

          <Form.Group controlId="event-name">
            <Form.Control type="text" placeholder="Event Name" className="request-input"></Form.Control>
          </Form.Group>

          <Form.Group controlId="event-description">
            <Form.Control as="textarea" placeholder="Event Description" className="home-textarea" rows="5"></Form.Control>
          </Form.Group>

          <FormGroup controlId="event-category">
            <Dropdown>
              <Dropdown.Toggle block variant="success" id="dropdown-basic" className="text-left event-drop-btn">Category</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Other</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Sport</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Academic</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </FormGroup>

          <FormGroup controlId="event-access">
            <Dropdown>
              <Dropdown.Toggle block variant="success" id="dropdown-basic" className="text-left event-drop-btn">Access Level</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Private</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Public</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </FormGroup>

          <FormGroup controlId="form-basic-date">
            <InfoCard info={datePicker} />
          </FormGroup>

        </div>

        <div style={{display: "inline-block", flex: "1", paddingLeft: "20px"}}>

          <FormGroup controlId="event-start-time">
            <TimePicker start="10:00" end="21:00" step={30} className="event-drop-btn" />
          </FormGroup>

          <FormGroup controlId="event-end-time">
          <TimePicker start="10:00" end="21:00" step={30} className="event-drop-btn"/>
          </FormGroup>
          <FormGroup controlId="event-location-drop">
            <Dropdown>
              <Dropdown.Toggle block variant="success" id="dropdown-basic" className="text-left event-drop-btn">
                Select Location
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Student Union</Dropdown.Item>
                <Dropdown.Item href="#/action-2">CB2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </FormGroup>
          <Form.Group controlId="event-location-text">
            <Form.Label>OR</Form.Label>
            <Form.Control type="text" placeholder="Location Name" className="request-input"></Form.Control>
          </Form.Group>
          <Form.Group controlId="event-phone">
            <Form.Control type="text" placeholder="Contact Phone Number" className="request-input"></Form.Control>
          </Form.Group>
          <Form.Group controlId="event-email">
            <Form.Control type="email" placeholder="Contact Email" className="request-input"></Form.Control>
          </Form.Group>
          <Button size="md" type="submit" className="request-btn">
            REQUEST
          </Button>
        </div>
      </Form>
    )
    
    return (
      <Container fluid={true} className="px-0 page">
        <NavMenu />
        <Row>
          <Col>
          {this.state.isAdmin ? 
            <BackgroundCard title="Create RSO Event" items={form}/> 
            : 
            <BackgroundCard title="Request Event" items={form}/>
          }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RequestEvent;
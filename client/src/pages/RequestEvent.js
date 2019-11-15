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

const headers = {
  "Content-Type": "application/json",
}

class RequestEvent extends React.Component {
  state = {
    startDate: new Date(),
    isAdmin: false,
    name: null,
    description: null,
    category: null,
    access: null,
    date: null,
    startTime: null,
    endTime: null,
    locationId: null,
    locationName: null,
    contactPhone: null,
    contactEmail: null
  };

  componentDidMount() {
   // this.checkIsAdmin();
  }

  //------------------ API calls ----------------------//
  requestEvent = (e) => {
    e.preventDefault();

    if(this.state.locationName !== null) {
      // add location
      // then add event
    }

    // format into datetime
    const start = "";
    const end = "";

    console.log({
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      contact_phone: this.state.contactPhone,
      contact_email: this.state.contactEmail,
      start_time: start,
      end_time: end,
      locationId: this.state.locationId,
      university_id: localStorage.getItem("uni_id")
    })

  }

  //------------------ helpers ----------------------//
  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleStartTimeChange = (time) => {
    this.setState({ startTime: this.secondsToTimestamp(time) });
  }

  handleEndTimeChange = (time) => {
    this.setState({ endTime: this.secondsToTimestamp(time) });
  }

  checkIsAdmin = () => {
    //this.setState({isAdmin: true});
  }

  onChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  secondsToTimestamp = (seconds) => {
    const date = new Date(null);
    date.setSeconds(seconds); 
    return date.toISOString().substr(11, 8);
  }

  //------------------ render ----------------------//
  render () {
    const datePicker = <DatePicker selected={this.state.startDate} onChange={this.handleDateChange} className="event-date-btn"/>

    const form = (
      <Form style={{display: "flex"}} onSubmit={this.requestEvent}>
        <div style={{display: "inline-block", flex: "1", paddingRight: "20px"}}>

          <Form.Group controlId="event-name">
            <Form.Control type="text" placeholder="Event Name" className="request-input" name="name" onChange={this.onChange}></Form.Control>
          </Form.Group>

          <Form.Group controlId="event-description">
            <Form.Control as="textarea" placeholder="Event Description" className="home-textarea" rows="5" name="description" onChange={this.onChange}></Form.Control>
          </Form.Group>

          <Form.Group controlId="form-basic-category-select">
            <Form.Control as="select" className="home-dropdown text-left event-drop-btn" onChange={this.onChange} name="category">
              <option value="" disabled selected>Select Category</option>
              <option>Sport</option>
              <option>Academic</option>
              <option>Music</option>
              <option>Outdoors</option>
              <option>Gaming</option>
              <option>Religion</option>
              <option>Politics</option>
              <option>Movies</option>
              <option>Alumni</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="form-basic-access-select">
            <Form.Control as="select" className="home-dropdown text-left event-drop-btn" onChange={this.onChange} name="access">
              <option value="" disabled selected>Select Access Level</option>
              <option>Public</option>
              <option>Private</option>
            </Form.Control>
          </Form.Group>

          <FormGroup controlId="form-basic-date">
            <InfoCard info={datePicker} />
          </FormGroup>

        </div>

        <div style={{display: "inline-block", flex: "1", paddingLeft: "20px"}}>

          <FormGroup controlId="event-start-time">
            <TimePicker start="00:00" end="23:30" step={30} className="event-drop-btn" onChange={this.handleStartTimeChange} value={this.state.startTime} />
          </FormGroup>

          <FormGroup controlId="event-end-time">
            <TimePicker start="00:00" end="23:30" step={30} className="event-drop-btn" onChange={this.handleEndTimeChange} value={this.state.endTime}/>
          </FormGroup>

          <Form.Group controlId="form-basic-location-select">
            <Form.Control as="select" className="home-dropdown text-left event-drop-btn" onChange={this.onChange} name="location">
              <option value="" disabled selected>Select Location</option>
              <option>SU</option>
              <option>CB2</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="event-location-text">
            <Form.Label>OR</Form.Label>
            <Form.Control type="text" placeholder="Location Name" className="request-input" name="location_name" onChange={this.onChange}></Form.Control>
          </Form.Group>
          <Form.Group controlId="event-phone">
            <Form.Control type="text" placeholder="Contact Phone Number" className="request-input" name="contactPhone" onChange={this.onChange}></Form.Control>
          </Form.Group>
          <Form.Group controlId="event-email">
            <Form.Control type="email" placeholder="Contact Email" className="request-input" name="contactEmail" onChange={this.onChange}></Form.Control>
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
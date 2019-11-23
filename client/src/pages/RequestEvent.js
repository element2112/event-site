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
    date: new Date(),
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
    contactEmail: null,
    locations: [],
    rsos: []
  };

  componentDidMount() {
   // this.checkIsAdmin();
   this.getLocations();
   this.getAdminRsos();
   this.setState({date: new Date()})
  }

  //------------------ API calls ----------------------//
  requestEvent = (e) => {
    e.preventDefault();

    if(this.state.date == null || this.state.startTime == null || this.state.endTime == null) {
      alert("Please ensure date and time are filled.");
      return;
    }

    // format into datetime
    const start = `${this.state.date.toISOString().split("T")[0]} ${this.state.startTime}`;
    const end = `${this.state.date.toISOString().split("T")[0]} ${this.state.endTime}`;

    //console.log(new Date(start).toISOString().slice(0, 19).replace('T', ' '))
    let url = "";
    let event = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      contact_phone: this.state.contactPhone,
      contact_email: this.state.contactEmail,
      start_time: start,
      end_time: end,
      location_id: this.state.locationId,
      university_id: localStorage.getItem("uni_id"),
      rso_id: this.state.access
    }

    if(this.state.access ===  "Public")
      url = "http://localhost:4000/api/events/addpublic";
    else if(this.state.access === "Private")
      url = "http://localhost:4000/api/events/addprivate";
    else 
      url = "http://localhost:4000/api/events/addrso";

    //add location if needed
    if(this.state.locationName !== null) {
      fetch("http://localhost:4000/api/location/addlocation", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: this.state.locationName,
            uni_id: localStorage.getItem("uni_id")
        })
      })
        .then((res) => res.json())
        .then((res) => {
          // add event with newly added location
            if (res) {
              fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({...event, location_id: res.loc_id})
              })
              .then((res) => res.json())
              .then((res) => {
                  if (res) {
                    alert("Requested");
                  } else throw res
              }).catch((res) => console.log(res))
            } else {
              alert("Cannot add, time overlaps");
            }
        })
        .catch((res) => console.log(res))
    // else just add event with a given location
    } else {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(event)
      })
      .then((res) => res.json())
      .then((res) => {
          if (res !== "Overlap") {
            alert("Requested")
          } else {
            alert("Cannot add, time overlaps");
          }
      }).catch((res) => console.log(res))
    }

  }

  getLocations = () => {
    fetch("http://localhost:4000/api/location/getlocations/" + localStorage.getItem("uni_id"), {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              this.setState({locations: res});
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  getAdminRsos = () => {
    fetch("http://localhost:4000/api/users/admins/" + localStorage.getItem("user_id"), {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              const rsos = [];
              res.forEach(rso => {
                rsos.push({name: rso.name, id: rso.rso_id})
              });
              this.setState({rsos: rsos});
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  //------------------ helpers ----------------------//
  handleDateChange = date => {
    this.setState({
      date: date
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
    const datePicker = <DatePicker selected={this.state.date} onChange={this.handleDateChange} className="event-date-btn"/>

    const locations = this.state.locations.map((loc, index) => {
      return (
      <option value={loc.loc_id}>{loc.name}</option>
      )
    })

    const rsos = this.state.rsos.map((r, index) => {
      return (
      <option value={r.id}>{r.name}</option>
      )
    })

    const form = (
      <Form style={{display: "flex"}} onSubmit={this.requestEvent}>
        <div style={{display: "inline-block", flex: "1", paddingRight: "20px"}}>

          <Form.Group controlId="event-name">
            <Form.Control required type="text" placeholder="Event Name" className="request-input" name="name" onChange={this.onChange}></Form.Control>
          </Form.Group>

          <Form.Group controlId="event-description">
            <Form.Control as="textarea" required placeholder="Event Description" className="home-textarea" rows="5" name="description" onChange={this.onChange}></Form.Control>
          </Form.Group>

          <Form.Group controlId="form-basic-category-select">
            <Form.Control as="select" required className="home-dropdown text-left event-drop-btn" onChange={this.onChange} name="category">
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
            <Form.Control as="select" required className="home-dropdown text-left event-drop-btn" onChange={this.onChange} name="access">
              <option value="" disabled selected>Select Access Level</option>
              <option>Public</option>
              <option>Private</option>
              {rsos}
            </Form.Control>
          </Form.Group>

          <FormGroup controlId="form-basic-date">
            <Form.Label>Date</Form.Label>
            <InfoCard info={datePicker} />
          </FormGroup>

        </div>

        <div style={{display: "inline-block", flex: "1", paddingLeft: "20px"}}>

          <FormGroup controlId="event-start-time">
            <Form.Label>Start Time</Form.Label>
            <TimePicker start="00:00" end="23:30" step={30} className="event-drop-btn" onChange={this.handleStartTimeChange} value={this.state.startTime} />
          </FormGroup>

          <FormGroup controlId="event-end-time">
            <Form.Label>End Time</Form.Label>
            <TimePicker start="00:00" end="23:30" step={30} className="event-drop-btn" onChange={this.handleEndTimeChange} value={this.state.endTime}/>
          </FormGroup>

          <Form.Group controlId="form-basic-location-select">
            <Form.Control as="select" className="home-dropdown text-left event-drop-btn" onChange={this.onChange} name="locationId">
              <option value="" disabled selected>Select Location</option>
              {locations}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="event-location-text">
            <Form.Label>OR</Form.Label>
            <Form.Control type="text" placeholder="Location Name" className="request-input" name="locationName" onChange={this.onChange}></Form.Control>
          </Form.Group>
          <Form.Group controlId="event-phone">
            <Form.Control type="text" required placeholder="Contact Phone Number" className="request-input" name="contactPhone" onChange={this.onChange}></Form.Control>
          </Form.Group>
          <Form.Group controlId="event-email">
            <Form.Control type="email" required placeholder="Contact Email" className="request-input" name="contactEmail" onChange={this.onChange}></Form.Control>
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
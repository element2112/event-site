import React from 'react';
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import EventCard from "../components/EventCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

const headers = {
  "Content-Type": "application/json",
}

class Event extends React.Component {
  state = {
    comments: [{email: "scastrolopez@knights.ucf.edu", text: "I'm excited to join :)", timestamp: "9/22/2019 5:00pm"}, {email: "bob@knights.ucf.edu", text: "Are meetings always at 5:00pm?", timestamp: "9/24/2019 10:00am"},
                {email: "scastrolopez@knights.ucf.edu", text: "I'm excited to join :)", timestamp: "9/22/2019 5:00pm"}, {email: "bob@knights.ucf.edu", text: "Are meetings always at 5:00pm?", timestamp: "9/24/2019 10:00am"},
                {email: "scastrolopez@knights.ucf.edu", text: "I'm excited to join :)", timestamp: "9/22/2019 5:00pm"}, {email: "bob@knights.ucf.edu", text: "Are meetings always at 5:00pm?", timestamp: "9/24/2019 10:00am"}],
    details: {},
    eventId: this.props.location.pathname.split("/event/")[1]
  }

  componentDidMount() {
    this.getInfo();
  }

  getDetails = () => {
    this.setState({details: {
      name: "UCF HACKS First Meeting",
      date: "9/22/2019",
      start: "5:00pm",
      end: "6:00pm",
      access: "UCF HACKS",
      category: "Computer Science",
      description: "Join us for UCF HACK's inaugural meeting. Any skill level can join. Refreshments will be served.",
      contactPhone: "407-555-5555",
      contactEmail: "ucfhacksclub@knights.ucf.edu"
    }})
  }

  getInfo = () => {
    fetch("http://localhost:4000/api/events/getevent/" + this.state.eventId, {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              res = res[0];
              
              this.setState({details: {
                name: res.name,
                start: this.getDateAndTime(res.start_time),
                end: this.getTime(res.end_time),
                category: res.category,
                description: res.description,
                contactPhone: res.contact_phone,
                contactEmail: res.contact_email
              }})
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  //------------------ helpers ----------------------//
  getDateAndTime = (datetime) => {
    return datetime.split("GMT")[0]
  }

  getTime = (datetime) => {
    return datetime.slice(10)
  }

  //------------------ Render ----------------------//
  render () {
    const comments = this.state.comments.map((comment, key) => 
      <InfoCard info={comment.email + ": " + comment.text + " - " + comment.timestamp}></InfoCard>
    )

    const rating = <p>*****</p>;

    const details = 
      <div>
        <p><b>{this.state.details.start} - {this.state.details.end}</b> </p>
        <p><b>Access: </b>{this.state.details.access}</p>
        <p><b>Category: </b>{this.state.details.category}</p>
        <p><b>Description: </b>{this.state.details.description}</p>
        <p><b>Contact Phone Number: </b>{this.state.details.contactPhone}</p>
        <p><b>Contact Email: </b>{this.state.details.contactEmail}</p>
      </div>
    
    return (
      <Container fluid={true} className="px-0 page">
        <NavMenu />
        <Row>
          <Col>
            <EventCard title={this.state.details.name} details={details} rating={rating} comments={comments}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Event;
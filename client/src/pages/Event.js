import React from 'react';
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import EventCard from "../components/EventCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

class Event extends React.Component {
  state = {
    comments: [{email: "scastrolopez@knights.ucf.edu", text: "I'm excited to join :)", timestamp: "9/22/2019 5:00pm"}, {email: "bob@knights.ucf.edu", text: "Are meetings always at 5:00pm?", timestamp: "9/24/2019 10:00am"},
                {email: "scastrolopez@knights.ucf.edu", text: "I'm excited to join :)", timestamp: "9/22/2019 5:00pm"}, {email: "bob@knights.ucf.edu", text: "Are meetings always at 5:00pm?", timestamp: "9/24/2019 10:00am"},
                {email: "scastrolopez@knights.ucf.edu", text: "I'm excited to join :)", timestamp: "9/22/2019 5:00pm"}, {email: "bob@knights.ucf.edu", text: "Are meetings always at 5:00pm?", timestamp: "9/24/2019 10:00am"}],
    details: {}
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

  componentDidMount() {
    this.getDetails();
  }

  render () {
    const comments = this.state.comments.map((comment, key) => 
      <InfoCard info={comment.email + ": " + comment.text + " - " + comment.timestamp}></InfoCard>
    )

    const rating = <p>*****</p>;

    const details = 
      <div><p>
        {this.state.details.date}, {this.state.details.start} - {this.state.details.end} </p>
        <p>{this.state.details.access}</p>
        <p>{this.state.details.category}</p>
        <p>{this.state.details.description}</p>
        <p>{this.state.details.contactPhone}</p>
        <p>{this.state.details.contactEmail}</p>
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
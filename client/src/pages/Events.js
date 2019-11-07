import React from 'react';
import {Link} from "react-router-dom";
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";
import "../styles/Buttons.css";

class Events extends React.Component {
  state = {
    events: [{name: "UCF HACKS first meeting", start: "9/22/2019 5:00pm", end: "6:00pm"}, {name: "UCF Career Fair", start: "9/24/2019 10:00am", end: "2:00pm"},
              {name: "UCF HACKS first meeting", start: "9/22/2019 5:00pm", end: "6:00pm"}, {name: "UCF Career Fair", start: "9/24/2019 10:00am", end: "2:00pm"},
              {name: "UCF HACKS first meeting", start: "9/22/2019 5:00pm", end: "6:00pm"}, {name: "UCF Career Fair", start: "9/24/2019 10:00am", end: "2:00pm"},
              {name: "UCF HACKS first meeting", start: "9/22/2019 5:00pm", end: "6:00pm"}, {name: "UCF Career Fair", start: "9/24/2019 10:00am", end: "2:00pm"},
              {name: "UCF HACKS first meeting", start: "9/22/2019 5:00pm", end: "6:00pm"}, {name: "UCF Career Fair", start: "9/24/2019 10:00am", end: "2:00pm"}]
  }

  render () {
    const events = this.state.events.map((event, key) => 
      <Link to="/event/123" className="event-link"> <InfoCard info={event.name + ", " + event.start + " - " + event.end}></InfoCard></Link>
    )

    const requestEvent = <Button variant="primary" className="request-btn">REQUEST EVENT</Button>
    
    return (
      <Container fluid={true} className="px-0 page">
        <NavMenu loc={this.props.match}/>
        <Row>
          <Col>
            <BackgroundCard title="Events" items={events} button={requestEvent}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Events;
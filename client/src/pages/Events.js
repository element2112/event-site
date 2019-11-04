import React from 'react';
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

class Events extends React.Component {
  state = {
    events: [{name: "UCF HACKS first meeting", start: "9/22/2019 5:00pm", end: "6:00pm"}, {name: "UCF Career Fair", start: "9/24/2019 10:00am", end: "2:00pm"}]
  }

  render () {
    const events = this.state.events.map((event, key) => 
      <InfoCard info={event.name + ", " + event.start + " - " + event.end}></InfoCard>
    )

    const requestEvent = <Button variant="primary">Request Event</Button>
    
    return (
      <Container fluid={true} className="px-0 page">
        <NavMenu />
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
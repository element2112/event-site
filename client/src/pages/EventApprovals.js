import React from 'react';
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

class EventApprovals extends React.Component {
  state = {
    events: [{name: "UCF Internship Fair", start: "9/22/2019 5:00pm", end: "6:00pm"}, {name: "Dev Meetup", start: "9/24/2019 10:00am", end: "2:00pm"}]
  }

  render () {
    const approveBtn = <Button variant="primary">Approve</Button>

    const declinebtn = <Button variant="danger">Decline</Button>

    const events = this.state.events.map((event, key) => 
      <InfoCard info={event.name + ", " + event.start + " - " + event.end} button1={approveBtn} button2={declinebtn}></InfoCard>
    )
    
    return (
      <Container fluid={true} className="px-0 page">
        <NavMenu />
        <Row>
          <Col>
            <BackgroundCard title="Event Approvals" items={events}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default EventApprovals;
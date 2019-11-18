import React from 'react';
import {Link} from "react-router-dom";
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";
import "../styles/Buttons.css";

const headers = {
  "Content-Type": "application/json",
}

class Events extends React.Component {
  state = {
    events: []
  }

  componentDidMount() {
    this.getRSOEvents();
    this.getPublicEvents();
    this.getPrivateEvents();
    
  }

  //------------------ API calls ----------------------//
  getPublicEvents = () => {
    fetch("http://localhost:4000/api/events/getapprovedpub/", {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              const events = [];
          
              res.forEach(event => {
                const start = this.getDateAndTime(event.start_time);
                const end = this.getTime(event.end_time.toString());
                events.push({name: event.name, id: event.event_id, start: start, end: end})
              });
              this.setState({events: [...this.state.events, ...events]});
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  getPrivateEvents = () => {
    fetch("http://localhost:4000/api/events/getapprovedprivate/" + localStorage.getItem("uni_id"), {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              const events = [];
          
              res.forEach(event => {
                const start = this.getDateAndTime(event.start_time);
                const end = this.getTime(event.end_time.toString());
                events.push({name: event.name, id: event.event_id, start: start, end: end})
              });
              this.setState({events: [...this.state.events, ...events]});
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  getRSOEvents = () => {
    fetch("http://localhost:4000/api/events/getrsoevents/" + localStorage.getItem("user_id"), {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              const events = [];
          
              res.forEach(event => {
                const start = this.getDateAndTime(event.start_time);
                const end = this.getTime(event.end_time.toString());
                events.push({name: event.name, id: event.event_id, start: start, end: end})
              });
              this.setState({events: [...this.state.events, ...events]});
              console.log(res);
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
    const events = this.state.events.map((event, key) => 
      <Link to={"/event/" + event.id} className="event-link"> <InfoCard info={event.name + ", " + event.start + " - " + event.end}></InfoCard></Link>
    )

    const requestEvent = <Button href="../requestEvent" variant="primary" className="request-btn">REQUEST EVENT</Button>
    
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
import React from 'react';
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

const headers = {
  "Content-Type": "application/json",
}

class EventApprovals extends React.Component {
  state = {
    events: []
  }

  componentDidMount() {
    this.getPublicEvents();
    this.getPrivateEvents();
  }

  //------------------ API calls ----------------------//
  getPublicEvents = () => {
    fetch("http://localhost:4000/api/events/getunapprovedpub/" + localStorage.getItem("uni_id"), {
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
                events.push({name: event.name, id: event.event_id, start: start, end: end, access: "public"})
              });
              this.setState({events: [...this.state.events, ...events]});
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  getPrivateEvents = () => {
    fetch("http://localhost:4000/api/events/getunapprovedprivate/" + localStorage.getItem("uni_id"), {
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
                events.push({name: event.name, id: event.event_id, start: start, end: end, access: "private"})
              });
              this.setState({events: [...this.state.events, ...events]});
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  approveEvent = (id, access) => {
    fetch("http://localhost:4000/api/events/approve" + access + "/" + id, {
        method: "POST",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              this.setState({events: []}, () => {
                this.getPublicEvents();
                this.getPrivateEvents();
              })
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  declineEvent = (id, access) => {
    fetch("http://localhost:4000/api/events/delete" + access + "/" + id, {
        method: "DELETE",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              this.setState({events: []}, () => {
                this.getPublicEvents();
                this.getPrivateEvents();
              })
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
    let approveBtns = [];
    this.state.events.forEach((e) => {
      approveBtns.push(<Button variant="primary" className="approve-btn" onClick={() => this.approveEvent(e.id, e.access)}>APPROVE</Button>);
    })

    let declineBtns = [];
    this.state.events.forEach((e) => {
      declineBtns.push(<Button variant="primary" className="decline-btn" onClick={() => this.declineEvent(e.id, e.access)}>DECLINE</Button>);
    })

    const events = this.state.events.map((event, index) => 
      <InfoCard info={event.name + ", " + event.start + " - " + event.end} button1={approveBtns[index]} button2={declineBtns[index]}></InfoCard>
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
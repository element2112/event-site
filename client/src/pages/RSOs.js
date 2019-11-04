import React from 'react';
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

class RSOs extends React.Component {
  state = {
    events: [{name: "Alpha Beta Charlie Delta Elephany"}, {name: "UCF HACKS"}]
  }

  render () {
    const rsos = this.state.events.map((rso, key) => 
      <InfoCard info={rso.name}></InfoCard>
    )

    const requestRSO = <Button variant="primary">Request RSO</Button>

    return (
      <Container fluid={true} className="px-0 page">
        <NavMenu />
        <Row>
          <Col>
            <BackgroundCard title="RSOs" items={rsos} button={requestRSO}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RSOs;
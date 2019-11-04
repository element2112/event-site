import React from 'react';
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

class RSOApprovals extends React.Component {
  state = {
    rsos: [{name: "UCF Democrats"}, {name: "UCF Republicans"}]
  }

  render () {

    const approveBtn = <Button variant="primary">Approve</Button>

    const declinebtn = <Button variant="danger">Decline</Button>

    const rsos = this.state.rsos.map((rso, key) => 
      <InfoCard info={rso.name} button1={approveBtn} button2={declinebtn}></InfoCard>
    )
    return (
      <Container fluid={true} className="px-0 page">
        <NavMenu />
        <Row>
          <Col>
            <BackgroundCard title="RSO Approvals" items={rsos}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RSOApprovals;
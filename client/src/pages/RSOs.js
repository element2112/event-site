import React from 'react';
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

class RSOs extends React.Component {
  state = {
    rsos: [{id:"1", name: "Alpha Beta Charlie Delta Elephant"}, {name: "UCF HACKS"},
              {id:"2", name: "Alpha Beta Charlie Delta Elephant"}, {name: "UCF HACKS"},
              {id:"3", name: "Alpha Beta Charlie Delta Elephant"}, {name: "UCF HACKS"},
              {id:"4", name: "Alpha Beta Charlie Delta Elephant"}, {name: "UCF HACKS"},
              {id:"5", name: "Alpha Beta Charlie Delta Elephant"}, {name: "UCF HACKS"}],
    memberRSOs: ["1", "2", "5"]
  }

  componentDidMount() {
    
  }

  render () {
    const joinRsoBtn = <Button variant="primary" className="approve-btn">JOIN</Button>

    const leaveRsoBtn = <Button variant="primary" className="decline-btn">LEAVE</Button>

    const rsos = this.state.rsos.map((rso, key) => {
      if(this.state.memberRSOs.includes(rso.id)) {
        return (<InfoCard info={rso.name} button1={leaveRsoBtn}></InfoCard>)
      } else {
        return (<InfoCard info={rso.name} button1={joinRsoBtn}></InfoCard>)
      }
      }
    )

    const requestRSO = <Button variant="primary" className="request-btn">REQUEST RSO</Button>

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
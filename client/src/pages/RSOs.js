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

class RSOs extends React.Component {
  state = {
    rsos: [],
    memberRSOs: []
  }

  componentDidMount() {
    this.getRsos();
  }

  //------------------ API calls ----------------------//
  getRsos = () => {
    fetch("http://localhost:4000/api/rso/getApprovedRsos/" + localStorage.getItem("uni_id"), {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              const rsos = [];
              res.forEach(rso => {
                rsos.push({name: rso.name, id: rso.rso_id})
              });
              this.setState({rsos: rsos});
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  //------------------ Render ----------------------//
  render () {
    const joinRsoBtn = <Button variant="primary" className="approve-btn">JOIN</Button>

    const leaveRsoBtn = <Button variant="primary" className="decline-btn">LEAVE</Button>

    const rsos = this.state.rsos.map((rso, key) => {
      if(this.state.memberRSOs.includes(rso.id)) {
        return (<InfoCard info={rso.name} button1={leaveRsoBtn}></InfoCard>)
      } else {
        return (<InfoCard info={rso.name} button1={joinRsoBtn}></InfoCard>)
      }
    })

    const requestRSO = <Button href="../requestRSO" variant="primary" className="request-btn">REQUEST RSO</Button>

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
import React from 'react';
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

class RSOApprovals extends React.Component {
  state = {
    rsos: []
  }

  componentDidMount() {
    this.getRsos();
  }

  //------------------ API calls ----------------------//
  getRsos = () => {
    fetch("http://localhost:4000/api/rso/getUnapprovedRsos/" + localStorage.getItem("uni_id"), {
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
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  approveRSO = () => {
    // changes rso to approved
  }

  declineRSO = () => {
    // deletes rso, rso_members, and rso_admin
  }

  //------------------ API calls ----------------------//
  render () {

    const approveBtn = <Button variant="primary" className="approve-btn">APPROVE</Button>

    const declinebtn = <Button variant="danger" className="decline-btn">DECLINE</Button>

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
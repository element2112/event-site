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

  approveRSO = (rso_id) => {
    fetch("http://localhost:4000/api/rso/approverso/" + rso_id, {
        method: "PATCH",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              this.getRsos();
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  declineRSO = (rso_id) => {
    // deletes rso, rso_members, and rso_admin
    fetch("http://localhost:4000/api/rso/reject-rso/" + rso_id, {
        method: "POST",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              this.getRsos();
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  //------------------ API calls ----------------------//
  render () {

    let approveBtns = [];
    this.state.rsos.forEach((r) => {
      approveBtns.push(<Button variant="primary" className="approve-btn" onClick={() => this.approveRSO(r.id)}>APPROVE</Button>);
    })

    let declineBtns = [];
    this.state.rsos.forEach((r) => {
      declineBtns.push(<Button variant="danger" className="decline-btn" onClick={() => this.declineRSO(r.id)}>DECLINE</Button>);
    })

    const rsos = this.state.rsos.map((rso, index) => 
      <InfoCard info={rso.name} button1={approveBtns[index]} button2={declineBtns[index]}></InfoCard>
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
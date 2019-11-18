import React from 'react';
import {Col, Row, Container, Button} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";

const headers = {
  "Content-Type": "application/json"
}

class RSOs extends React.Component {
  state = {
    rsos: [],
    memberRSOs: []
  }

  componentDidMount() {
    this.getRsos();
    this.getMemberRsos();
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

  getMemberRsos = () => {
    fetch("http://localhost:4000/api/rso/getrsosforuser/" + localStorage.getItem("user_id"), {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              const rsos = [];
              res.forEach(rso => {
                rsos.push(rso.rso_id)
              });
              this.setState({memberRSOs: rsos});
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  leaveRSO = (id) => {
    fetch("http://localhost:4000/api/rso/leaverso", {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          rso_id: id
        })
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              this.getRsos();
              this.getMemberRsos();
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  joinRSO = (id) => {
    console.log("rso id " + id);
    console.log("user id " + localStorage.getItem("user_id"));
    fetch("http://localhost:4000/api/rso/joinrso", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          rso_id: id
        })
    })
        .then((res) => res.json())
        .then((res, err) => {
            if (res) {
              this.getRsos();
              this.getMemberRsos();
              console.log(res);
            } else throw err
        })
        .catch((res) => console.log(res))
  }

  //------------------ Render ----------------------//
  render () {
    let leaveBtns = []
    this.state.rsos.forEach((r) => {
      leaveBtns.push(<Button variant="primary" className="decline-btn" onClick={() => this.leaveRSO(r.id)}>LEAVE</Button>);
    })

    let joinBtns = []
    this.state.rsos.forEach((r) => {
      joinBtns.push(<Button variant="primary" className="approve-btn" onClick={() => this.joinRSO(r.id)}>JOIN</Button>);
    })

    const rsos = this.state.rsos.map((rso, index) => {
      if(this.state.memberRSOs.includes(rso.id)) {
        return (<InfoCard info={rso.name} button1={leaveBtns[index]}></InfoCard>)
      } else {
        return (<InfoCard info={rso.name} button1={joinBtns[index]}></InfoCard>)
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
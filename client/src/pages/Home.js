import React from 'react';
import {Col, Row, Container} from "react-bootstrap";
import "../styles/Home.css";
import "../styles/App.css";
import HomeCard from "../components/HomeCard";

class Home extends React.Component {

  render () {
    return (
      <Container fluid={true} id="home-container">
        <Row>
          <Col md={5} id="home-col-1">
            <h1 id="home-title"><b style={{"backgroundColor": "#412234"}}>EVENT IT</b></h1>
            <h2 id="home-subtitle">View upcoming<br />college events</h2>
          </Col>
          <Col id="home-col-2">
            <HomeCard />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home;
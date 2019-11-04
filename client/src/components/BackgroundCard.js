import React from "react";
import "../styles/App.css";
import "../styles/NavMenu.css";
import "../styles/BackgroundCard.css";
import {Card, Button} from "react-bootstrap";


class BackgroundCard extends React.Component {

  render() {

    return (
      <Card className="bg-card">
        <Card.Header as="h2" className="home-card-color" id="home-card-header">{this.props.title}{this.props.button}</Card.Header>
        <Card.Body>
          {this.props.items}
          {this.props.approveBtn}
          {this.props.declinebtn}
        </Card.Body>
      </Card>
    )
  }
};

export default BackgroundCard;

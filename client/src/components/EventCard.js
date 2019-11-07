import React from "react";
import "../styles/App.css";
import "../styles/NavMenu.css";
import "../styles/BackgroundCard.css";
import {Card, Button} from "react-bootstrap";


class EventCard extends React.Component {

  render() {

    return (
      <Card className="bg-card event-card">
        <Card.Header as="h2" className="home-card-color" id="home-card-header">{this.props.title}{this.props.button} {this.props.rating}</Card.Header>
        <Card.Body style={{"overflow-y": "scroll"}}>
          {this.props.details}
        </Card.Body>
        <Card.Header as="h2" className="home-card-color" id="home-card-header">Comments</Card.Header>
        <Card.Body>
          {this.props.comments}
        </Card.Body>
      </Card>
    )
  }
};

export default EventCard;

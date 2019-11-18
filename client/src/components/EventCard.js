import React from "react";
import "../styles/App.css";
import "../styles/NavMenu.css";
import "../styles/BackgroundCard.css";
import {Card, Button, Form, Modal} from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';

const headers = {
  "Content-Type": "application/json",
}

class EventCard extends React.Component {

  render() {
    let rating = null;
    const star = <FontAwesomeIcon icon={faStar}/>
    if(this.props.rating == 1) {
      rating = <div>{star}</div>;
    } else if (this.props.rating == 2) {
      rating = <div>{star}{star}</div>;
    } else if (this.props.rating == 3) {
      rating = <div>{star}{star}{star}</div>;
    } else if (this.props.rating == 4) {
      rating = <div>{star}{star}{star}{star}</div>;
    } else if (this.props.rating == 5) {
      rating = <div>{star}{star}{star}{star}{star}</div>;
    }

    return (
      <Card className="bg-card event-card">
        <Card.Header as="h2" className="home-card-color" id="home-card-header">{this.props.title} {rating}</Card.Header>
        <Card.Body style={{"overflow-y": "scroll"}}>
        {this.props.details}
        </Card.Body>
        <Card.Header as="h2" className="home-card-color" id="home-card-header">Comments</Card.Header>
        <Card.Body>
          {this.props.comments}
          {this.props.button}
        </Card.Body>
      </Card>
    )
  }
};

export default EventCard;

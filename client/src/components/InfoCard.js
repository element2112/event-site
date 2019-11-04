import React from "react";
import "../styles/App.css";
import "../styles/NavMenu.css";
import "../styles/BackgroundCard.css";
import "../styles/InfoCard.css";
import {Card} from "react-bootstrap";


class InfoCard extends React.Component {

  render() {
    return (
      <Card className="info-card">
        <Card.Body>
          {this.props.info}
          {this.props.button1}
          {this.props.button2}
        </Card.Body>
      </Card>
    )
  }
};

export default InfoCard;

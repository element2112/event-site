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
        <Card.Body className="d-flex justify-content-between">
          <div style={{marginTop: "4px"}}>
            {this.props.info}
          </div>
          <div>
            {this.props.button1}
            {this.props.button2}
          </div>
        </Card.Body>
      </Card>
    )
  }
};

export default InfoCard;

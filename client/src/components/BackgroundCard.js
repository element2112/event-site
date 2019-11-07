import React from "react";
import "../styles/App.css";
import "../styles/NavMenu.css";
import "../styles/BackgroundCard.css";
import {Card, Button} from "react-bootstrap";


class BackgroundCard extends React.Component {

  render() {

    return (
      <Card className="bg-card">
        <Card.Header as="h2" className="home-card-color" id="home-card-header">
          {this.props.title}
          <div style={{display: "inline", float: "right"}}>
            {this.props.button}
          </div>
        </Card.Header>
        <Card.Body style={{"overflow-y": "scroll"}}>
          {this.props.items}
        </Card.Body>
      </Card>
    )
  }
};

export default BackgroundCard;

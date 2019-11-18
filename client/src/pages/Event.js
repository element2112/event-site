import React from 'react';
import {Col, Row, Container, Button, Modal} from "react-bootstrap";
import "../styles/App.css";
import NavMenu from "../components/NavMenu";
import BackgroundCard from "../components/BackgroundCard";
import EventCard from "../components/EventCard";
import InfoCard from "../components/InfoCard";
import "../styles/Page.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


const headers = {
  "Content-Type": "application/json",
}

class Event extends React.Component {
  state = {
    comments: [],
    userComments: [],
    details: {},
    eventId: this.props.location.pathname.split("/event/")[1],
    showAddModal: false,
    showEditModal: false,
    commentText: null,
    rating: null,
    editingId: null
  }

  componentDidMount() {
    this.getInfo();
    this.getComments();
    this.getUserComments();
    this.getRating();
  }

  //------------------ API calls ----------------------//
  getInfo = () => {
    fetch("http://localhost:4000/api/events/getevent/" + this.state.eventId, {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              res = res[0];
              
              this.setState({details: {
                name: res.name,
                start: this.getDateAndTime(res.start_time),
                end: this.getTime(res.end_time),
                category: res.category,
                description: res.description,
                contactPhone: res.contact_phone,
                contactEmail: res.contact_email
              }})
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  getRating = () => {
    fetch("http://localhost:4000/api/comments/geteventrating/" + this.state.eventId, {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              if(res == null)
                this.setState({rating: 0})
              else
                this.setState({rating: Math.floor(res)}, () => console.log(Math.floor(res)))
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  getComments = () => {
    fetch("http://localhost:4000/api/comments/getcomments/" + this.state.eventId, {
        method: "GET",
        headers: headers
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              const comments = [];
              res.forEach(c => {
                comments.push({
                  email: c.email, 
                  text: c.text,
                  timestamp: c.timestamp,
                  id: c.comment_id
                })
              });
              this.setState({comments: comments});
              console.log(comments)
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  getUserComments = () => {
    fetch("http://localhost:4000/api/comments/getusercommentsbyevent/" + localStorage.getItem("user_id"), {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          event_id: this.state.eventId
      })
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
              const comments = [];
              console.log(res)
              res.forEach(c => {
                comments.push(c.comment_id)
              });
              this.setState({userComments: comments}, () => console.log(this.state.userComments));
              console.log(res);
            } else throw res
        })
        .catch((res) => console.log(res))
  }

  deleteComment = (id) => {

    fetch("http://localhost:4000/api/comments/deletecomment/" + id, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({
            user_id: localStorage.getItem("user_id")
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res) {
          this.getComments();
        } else throw res
    })
    .catch((res) => console.log(res))
  }

  toggleAddModal = () => {
    this.setState({showAddModal: !this.state.showAddModal})
  }

  toggleEditModal = (id) => {
    this.setState({showEditModal: !this.state.showEditModal, editingId: id})
  }

  onChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    }, console.log(e.currentTarget.value))
  }

  addComment = () => {
    fetch("http://localhost:4000/api/comments/addcomment/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          text: this.state.commentText,
          timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
          rating: this.state.rating,
          event_id: this.state.eventId,
          user_id: localStorage.getItem("user_id")
      })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res) {
          this.getComments();
          this.getUserComments();
          this.setState({commentText: null, rating: null})
        } else throw res
    })
    .catch((res) => console.log(res))

    this.toggleAddModal();
  }

  editComment = (id) => {
    console.log(id)
    fetch("http://localhost:4000/api/comments/editcomment/" + this.state.editingId, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          text: this.state.commentText,
          event_id: this.state.eventId,
          user_id: localStorage.getItem("user_id")
      })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res) {
          this.getComments();
          this.getUserComments();
          this.setState({commentText: null, rating: null});
          
        } else throw res
    })
    .catch((res) => console.log(res))

    this.toggleEditModal();
  }

  //------------------ helpers ----------------------//
  getDateAndTime = (datetime) => {
    return datetime.split("GMT")[0]
  }

  getTime = (datetime) => {
    return datetime.slice(10)
  }

  //------------------ Render ----------------------//
  render () {

    const addModal = 
    <Modal show={this.state.showAddModal} animation>
      <Modal.Header>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
    
      <Modal.Body>
        <input type="text" rows="5" style={{width: "100%"}} name="commentText" onChange={this.onChange}></input>
        <select name="rating" onChange={this.onChange}>
          <option disabled selected>Choose a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </Modal.Body>
    
      <Modal.Footer>
        <Button variant="secondary" onClick={this.toggleAddModal}>Cancel</Button>
        <Button variant="primary" onClick={this.addComment}>Submit</Button>
      </Modal.Footer>
    </Modal>

    const editModal = 
    <Modal show={this.state.showEditModal} animation>
      <Modal.Header>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input type="text" rows="5" style={{width: "100%"}} name="commentText" onChange={this.onChange}></input>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={this.toggleEditModal}>Cancel</Button>
        <Button variant="primary" onClick={this.editComment}>Submit</Button>
      </Modal.Footer>
    </Modal>

    let deleteBtns = [];
    this.state.comments.forEach((c) => {
      deleteBtns.push(<FontAwesomeIcon icon={faTimesCircle} className="delete-comment-btn" onClick={() => this.deleteComment(c.id)}/>);
    })

    let editBtns = [];
    this.state.comments.forEach((c) => {
      editBtns.push(<FontAwesomeIcon icon={faEdit} className="edit-comment-btn" onClick={() => this.toggleEditModal(c.id)} />);
    })

    const comments = this.state.comments.map((comment, index) => {
      if(this.state.userComments.includes(comment.id)) {
        return ( <InfoCard info={comment.email + ": " + comment.text + " - " + comment.timestamp} button1={deleteBtns[index]} button2={editBtns[index]}></InfoCard>)
      } else {
        return ( <InfoCard info={comment.email + ": " + comment.text + " - " + comment.timestamp}></InfoCard>)
      }
    })

    const addCommentBtn = (<Button onClick={this.toggleAddModal}>Add new comment</Button>)

    const rating = 4;

    const details = 
      <div>
        <p><b>{this.state.details.start} - {this.state.details.end}</b> </p>
        <p><b>Access: </b>{this.state.details.access}</p>
        <p><b>Category: </b>{this.state.details.category}</p>
        <p><b>Description: </b>{this.state.details.description}</p>
        <p><b>Contact Phone Number: </b>{this.state.details.contactPhone}</p>
        <p><b>Contact Email: </b>{this.state.details.contactEmail}</p>
      </div>
    
    return (
      <Container fluid={true} className="px-0 page">
        {this.state.showAddModal ? addModal : null}
        {this.state.showEditModal ? editModal : null}
        <NavMenu />
        <Row>
          <Col>
            <EventCard title={this.state.details.name} details={details} rating={this.state.rating} comments={comments} location={this.props.location} button={addCommentBtn}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Event;
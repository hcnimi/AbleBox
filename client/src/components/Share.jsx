import React from 'react';
import Helmet from 'react-helmet';
import { Col, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import css from '../styles/Share.css';
import $ from 'jquery';
import shareIcon from '../assets/share.png';

class Share extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleClick() {
    // change file acl to public
    $.ajax({
      type: 'POST',
      url: '/share',
      data: this.props.file,
      contentType: 'application/json; charset=utf-8',
    })
    .done(() => {
      FB.ui({
        method: 'share',
        display: 'popup',
        href: 'https://s3-us-west-1.amazonaws.com/ablebox/' + this.props.file.s3_objectId
      }, function(response){});
    })
    .fail(() => {
      alert('failed to share');
    });
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render () {
    return (
      <React.Fragment>
        <Button className="btn-sm btn-link shadow-sm" onClick={this.toggle} type="download">
          <img width="30px" background="transparent" src={shareIcon} alt="share"/>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Email</ModalHeader>
          <ModalBody>
            <Input onChange={this.handleEmailChange}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={!this.state.email.length} onClick={this.handleClick}>Share</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Share;
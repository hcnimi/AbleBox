import React from 'react';
import { Row, Col, Button, Form, FormGroup, FormControl, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class SignOut extends React.Component {

  render() {
    return (
      <div color="light">
        <div>
        <br/>
          <h2 color="light" className="text-center font-weight-bold" id="signInTitle">You are successfully logged out!</h2>
        </div>
        <br/>
      </div>
    )
  }
}

export default withRouter(SignOut);

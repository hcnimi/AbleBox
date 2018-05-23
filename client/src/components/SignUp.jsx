import React from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import { Alert, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      email: '',
      passwordMatch: false,
      passwordConfirmationTyped: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPasswordsMatch = this.checkPasswordsMatch.bind(this);
    this.isPasswordErrorDisplayed = this.isPasswordErrorDisplayed.bind(this);
    this.isSubmitButtonEnabled = this.isSubmitButtonEnabled.bind(this);
  }

  handleOnChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  checkPasswordsMatch(e) {
    e.preventDefault();
    this.handleOnChange(e);
    this.setState({
      passwordConfirmationTyped: true
    });
    if (e.target.value === this.state.password) {
      this.setState({
        passwordMatch: true
      });
    } else {
      this.setState({
        passwordMatch: false
      });
    }
  }

  isSubmitButtonEnabled() {
    return !(this.state.email.length > 0 && this.state.firstname.length > 0 && this.state.lastname.length > 0 && this.state.password.length > 0 && this.state.passwordMatch);
  }

  isPasswordErrorDisplayed() {
    return (this.state.passwordConfirmationTyped && !this.state.passwordMatch && this.state.confirmPassword.length > 0);
  }

  handleSubmit(e) {
    e.preventDefault();
    var that = this;
    var data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };
    if (this.state.passwordMatch) {
      $.ajax ({
        type: 'POST',
        url: '/signup',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function(data, textStatus, jqXHR) {
          that.props.history.push('/home'); // need to decide on the correct path to redirect to
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert(errorThrown); // need to decide on what we are doing here with the error
        }
      });
    }
  }

  render() {
    return (
      <div color="light">
        <div>
        <br/>
          <h2 color="light" className="text-center font-weight-bold" id="signUpTitle"> Sign Up </h2>
        </div>
        <br/>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={{ size: 8, offset: 2 }} sm={{ size: 3, offset: 3 }} md={{ size: 3 }} lg={{ size: 3}}>
                <FormGroup>
                    <Label for="firstName"> First Name </Label>
                    <Input type="text" name="firstname" placeholder="first name" onChange={this.handleOnChange}></Input>
                </FormGroup>
              </Col>
              <Col xs={{ size: 8, offset: 2 }} sm={{ size: 3, offset: 0 }} md={{ size: 3}} lg={{ size: 3}}>
                <FormGroup>
                  <Label for="lastName"> Last Name </Label>
                  <Input type="text" name="lastname" placeholder="last name" onChange={this.handleOnChange}></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 8, offset: 2 }} sm={{ size: 6, offset: 3 }} md={{ size: 6}} lg={{ size: 6}}>
                <FormGroup>
                  <Label for="email"> Email Address </Label>
                  <Input type="text" name="email" placeholder="email address" onChange={this.handleOnChange}></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 8, offset: 2 }} sm={{ size: 6, offset: 3 }} md={{ size: 6}} lg={{ size: 6}}>
                <FormGroup>
                  <Label for="password"> Password </Label>
                  <Input type="password" name="password" placeholder="password" onChange={this.handleOnChange}></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 8, offset: 2 }} sm={{ size: 6, offset: 3 }} md={{ size: 6}} lg={{ size: 6}}>
                <FormGroup>
                  {(this.isPasswordErrorDisplayed()) ? (<Alert color="danger">
                    Password does not match Confirmation Password!
                  </Alert>) : null }
                  <Label for="password"> Confirm Password </Label>
                  <Input type="password" name="confirmPassword" placeholder="confirm password" onChange={this.checkPasswordsMatch}></Input>
                </FormGroup>
              </Col>
            </Row>
            <br/>
            <Button className="d-block mx-auto btn-outline-primary" disabled={this.isSubmitButtonEnabled()} type="submit">Sign Up</Button>
          </Form>
      </div>
    )
  }
}

export default withRouter(SignUp);


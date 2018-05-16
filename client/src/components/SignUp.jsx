import React from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullName: '',
      birthYear: '',
      email: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange(e) {
    e.preventDefault();
    this.setState{
      [e.target.name]: e.target.value
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var that = this;
    var data = {
      username: this.state.username,
      password: this.state.password
    };
    $.ajax ({
      type: 'POST',
      url: '/login',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      success: function(data, textStatus, jqXHR) {
        that.props.history.push('/home'); // need to decide on the correct path to redirect to
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown); // need to decide on what we are doing here with the error
      }
    })
  }

  render() {
  return (
    <div>
      <div>
        <h4> Sign Up </h4>
      </div>
      <form onSubmit={this.handleSubmit}>
        <label> Full Name </label>
        <input type="text" name="fullName" onChange={this.handleOnChange}></input>
        <label> Email Address </label>
        <input type="text" name="email" onChange={this.handleOnChange}></input>
        <label> username </label>
        <input type="text" name="username" onChange={this.handleOnChange}></input>
        <label> password </label>
        <input type="text" name="password" onChange={this.handleOnChange}></input>
        <label> Birth Year </label>
        <input type="number" name="birthYear" onChange={this.handleOnChange}></input>
      </form>
    </div>
  )
}

export default withRouter(SignUp);


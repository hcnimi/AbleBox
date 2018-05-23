import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var that = this;
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    $.ajax ({
      type: 'POST',
      url: '/signin',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
    })
    .done(() => {
      that.props.history.push('/home');
    })
    .fail(() => {
      console.log('failed to login');
    });
  }

  render() {
    return (
      <div className='login'>
        <form onSubmit={ this.handleSubmit }>
          <FormGroup controlId='email' bsSize='large'>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type='email'
              value={ this.state.email }
              onChange={ this.handleChange }
            />
          </FormGroup>
          <FormGroup controlId='password' bsSize='large'>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={ this.state.password }
              onChange={ this.handleChange }
              type='password'
            />
          </FormGroup>
           <Button color="primary" type='submit'>primary</Button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
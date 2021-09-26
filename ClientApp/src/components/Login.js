import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert} from 'reactstrap';
import UserContext from '../UserContext'


export class Login extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    fetch('api/login/', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state) 
    }).then((response) => {
      return response.json();
    }).then((data) => {
      // storage token
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('role', data.role)
      this.props.history.push('/')
    });

    // login is true
    this.context.update({isLogin: true});


    // this.props.parentCallback(this.state);

    // console.log("lg32");
    // console.log(this.state);
  }

  render() {
    return (
      <div>
        <Alert color="danger">
        Test account for QA role: username: qa; password: qa
        </Alert>

        <Alert color="danger">
        Test account for RD role: username: rd; password: rd
        </Alert>
        
        <form>
          <FormGroup>
            <Label for="summary">Username</Label>
            <Input type="text" name="username" id="username" onChange={this.handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" onChange={this.handleInputChange} />
          </FormGroup>

          <Button onClick={this.handleSubmit}>Login</Button>
        </form>
      </div>
    );
  }


}

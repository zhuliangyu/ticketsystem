import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class TicketForm extends Component {
  static displayName = TicketForm.name;

  constructor(props) {
    super(props);
    this.state = { summary: '',  description: ''};
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
    // console.log(this.state);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let ticket = {
      ... this.state,
      isResolve: false
    }

    this.props.parentCallback(ticket);
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup>
            <Label for="summary">Summary</Label>
            <Input type="text" name="summary" id="summary" onChange={this.handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label for="description">Descrption</Label>
            <Input type="textarea" name="description" id="description" onChange={this.handleInputChange} />
          </FormGroup>

          <Button onClick={this.handleSubmit}>Submit</Button>
        </form>
      </div>
    );
  }
}

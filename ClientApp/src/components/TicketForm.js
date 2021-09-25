import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class TicketForm extends Component {
  static displayName = TicketForm.name;

  constructor(props) {
    super(props);
    // console.log("123");
    // console.log(this.props.summary);

    this.state = { summary: this.props.summary,  description: this.props.description};
    // console.log("123");
    // console.log(this.state);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
    // console.log('ticketForm');
    // console.log(this.state);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let ticket;
    if (this.props.summary == null || this.props.summary == undefined) {
      // create ticket 
      ticket = {
        ... this.state,
        creator: localStorage.getItem('username'),
        isResolve: false
      } 
      this.props.parentCallback(ticket);
    } else {
      // update ticket
      ticket = {... this.state}

      // console.log("TF40");
      // console.log(ticket);
      
      this.props.parentCallback(ticket, this.props.id);
    }
    
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <form>
          <FormGroup>
            <Label for="summary">Summary</Label>
            {
              this.props.summary != null 
              ? <Input type="text" name="summary" id="summary" onChange={this.handleInputChange} value={this.state.summary}/> 
              : <Input type="text" name="summary" id="summary" onChange={this.handleInputChange} />
            }
            
          </FormGroup>

          <FormGroup>
            <Label for="description">Descrption</Label>
            {
              this.props.summary != null 
              ? <Input type="textarea" name="description" id="description" onChange={this.handleInputChange} value={this.state.description}/>
              : <Input type="textarea" name="description" id="description" onChange={this.handleInputChange}/>
            }
            
          </FormGroup>

          <Button onClick={this.handleSubmit}>Submit</Button>
        </form>
      </div>
    );
  }
}

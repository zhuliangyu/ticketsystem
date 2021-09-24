import React, { Component } from 'react';
// import {NavLink } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { TicketForm } from './TicketForm';


export class Home extends Component {
  static displayName = Home.name;
  
  constructor(props) {
    super(props);
    this.state = { tickets: []};
  }

  componentDidMount() {
    this.populateTicketsData();
  }

  async populateTicketsData() {
    const response = await fetch('api/tickets');
    const data = await response.json();
    this.setState({tickets: data})
  }

  handleCreateTicket = () => {
    console.log("Add");
  }

  removeTicketById = (id) => {
    let tickets = this.state.tickets.filter((ticket) => {
      return ticket.id !== id;
    });
    return tickets;
  }

  handleDeleteTicket = (id) => {
    // console.log("Del" + id);
    fetch('api/tickets/' + id, { method: 'DELETE' })
        .then(() => this.setState({ tickets: this.removeTicketById(id)}));
  }

  handleEditTicket = (e) => {
    console.log("Edit");
  }

  generatePayloadAfterResolve = (id) => {
    let targetTicket;
    for (const ticket of this.state.tickets) {
      if (ticket.id === id) {
        targetTicket = {...ticket};
        targetTicket.isResolved = !ticket.isResolved;
      }
    }
    return targetTicket;
  }

  generateTicketsAfterResolve = (id) => {
    let tickets = [...this.state.tickets];
    for (let ticket of tickets) {
      if (ticket.id === id) {
        ticket.isResolved = !ticket.isResolved;
      }
    }
    // console.log(tickets);
    return tickets;
  }

  handleResolveTicket = (id) => {
    // console.log("Solve");
    fetch('api/tickets/' + id, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.generatePayloadAfterResolve(id)) 
    }).then(() => this.setState({ tickets: this.generateTicketsAfterResolve(id)}));
  }

  handleCallBackCreateTicket = (ticketData) => {
    fetch('api/tickets/', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticketData) 
    }).then((response) => {
      return response.json();
    }).then((data) => {
        this.setState({ tickets: [...this.state.tickets, data]})
    });
  }

  renderTicketsTable(tickets) {
    // console.log(tickets);

    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Ticket Id</th>
            <th>Summary</th>
            <th>Description</th>
            <th>Creator</th>
            <th>Resolve</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket =>
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.summary}</td>
              <td>{ticket.description}</td>
              <td>{ticket.creator}</td>
              <td>{ticket.isResolved ? 'Yes' : 'No'}</td>
              <td><button onClick={() => {this.handleResolveTicket(ticket.id)}}>{ticket.isResolved ? 'Unresolve' : 'Resolve'}</button></td>
              <td><button onClick={this.handleEditTicket}>Edit</button></td>
              <td><button onClick={() => {this.handleDeleteTicket(ticket.id)}}>Del</button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render () {
    let tableContent = this.renderTicketsTable(this.state.tickets);

    return (
      <div>
        <h1>Hello, List all tickets</h1>

        <TicketForm parentCallback={this.handleCallBackCreateTicket}></TicketForm>

        {tableContent}
      </div>
    );
  }
}

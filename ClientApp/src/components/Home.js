import React, { Component } from 'react';
// import {NavLink } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { TicketForm } from './TicketForm';


export class Home extends Component {
  static displayName = Home.name;
  
  constructor(props) {
    super(props);
    this.state = { 
      tickets: [], 
      
      id: '',
      summary: '',
      description:'',
      isResolved: false,
      creator: ''
    };
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

  handleEditTicket = (id, summary, description, isResolved, creator) => {
    // console.log("Edit");
    // console.log(id);

    // console.log("h53");
    // console.log(id + summary + description + isResolved + creator);
    let updatedTicket = {
      id: id,
      summary: summary,
      description, description,
      isResolved, isResolved,
      creator: creator
    }
    // console.log("h62");
    // console.log(updatedTicket);

    // this.setState({id: id, summary: summary, description: description, isResolved: isResolved, creator: creator})
    let newState = {... this.state};
    newState.id = id;
    newState.summary = summary;
    newState.description = description;
    newState.creator = creator;

    this.setState(newState, () => {
      // console.log("h68");
      // console.log(newState);
      // console.log(this.state);
    })
    
    
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

  generateTicketsAfterEdit = (ticket, id) => {
    // console.log('H128');
    // console.log(newTicket);

    let newState = {... this.state};
    // update curTicket
    newState.summary = ticket.summary;
    newState.description = ticket.description;

    // console.log("h137");
    // console.log(newState);

    // remove id ticket from newstate.tickets
    newState.tickets = newState.tickets.filter((ele) => {
      return ele.id !== id
    })

    
    // append modified ticket to state.tickets
    newState.tickets.push({
      id: this.state.id,
      summary: newState.summary,
      description: newState.description,
      creator: this.state.creator,
      isResolved: this.state.isResolved
    })

    // console.log("h137");
    // console.log(newState);

    // update state
    this.setState(newState, () => {
      // console.log("h158");
      // console.log(this.state);
    });
  }

  handleCallBackEditTicket = (ticketData, id) => {
    
    let updatedTicket = {
      id: this.state.id,
      summary: this.state.summary,
      description: this.state.description,
      isResolved: this.state.isResolved,
      creator: this.state.creator
    };

    updatedTicket.summary = ticketData.summary;
    updatedTicket.description = ticketData.description;

    // console.log("ticket after updated");
    // console.log(updatedTicket);

    fetch('api/tickets/' + id, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTicket) 
    }).then(() => {
        this.generateTicketsAfterEdit(ticketData, id)
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
              <td><button onClick={() => {this.handleEditTicket(ticket.id, ticket.summary, ticket.description, ticket.isResolved, ticket.creator)}}>Edit</button></td>
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
        {/* create form */}
        <TicketForm parentCallback={this.handleCallBackCreateTicket}></TicketForm>

        {tableContent}

        {/* edit form */}
        <TicketForm parentCallback={this.handleCallBackEditTicket} key={this.state.id} id={this.state.id} summary={this.state.summary} description={this.state.description}></TicketForm>

      </div>
    );
  }
}

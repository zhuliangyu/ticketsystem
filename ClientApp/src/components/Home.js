import React, { Component } from 'react';
import { TicketForm } from './TicketForm';


export class Home extends Component {
  static displayName = Home.name;
  
  constructor(props) {
    super(props);
    this.state = { 
      tickets: [], 
      isEdit: false,
      
      id: '',
      summary: '',
      description:'',
      isResolved: false,
      creator: ''
    };

    this.headers = {"Content-Type": "application/json"};
    let token = localStorage.getItem('token');
    if (token) {
      this.headers["Authorization"] = `Token ${token}`;
    }
  }

  componentDidMount() {
    this.populateTicketsData();
  }

  async populateTicketsData() {
    const response = await fetch('api/tickets');
    const data = await response.json();
    this.setState({tickets: data})
  }
  
  removeTicketById = (id) => {
    let tickets = this.state.tickets.filter((ticket) => {
      return ticket.id !== id;
    });
    return tickets;
  }

  handleDeleteTicket = (id) => {
    fetch('api/tickets/' + id, { method: 'DELETE', headers: this.headers})
        .then(() => this.setState({ tickets: this.removeTicketById(id)}));
  }

  handleEditTicket = (id, summary, description, isResolved, creator) => {
    let updatedTicket = {
      id: id,
      summary: summary,
      description: description,
      isResolved: isResolved,
      creator: creator
    }
    let newState = {... this.state};
    newState.id = id;
    newState.summary = summary;
    newState.description = description;
    newState.creator = creator;
    newState.isEdit = true;

    this.setState(newState, () => {
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
    return tickets;
  }

  handleResolveTicket = (id) => {
    fetch('api/tickets/resolve/' + id, { 
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(this.generatePayloadAfterResolve(id)) 
    })
    .then(() => this.setState({ tickets: this.generateTicketsAfterResolve(id)}))
    .catch((error) => {
      console.log(error);
    });
  }

  handleCallBackCreateTicket = (ticketData) => {
    fetch('api/tickets/', { 
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(ticketData) 
    }).then((response) => {
      return response.json();
    }).then((data) => {
        this.setState({ tickets: [...this.state.tickets, data]})
    });
  }

  generateTicketsAfterEdit = (ticket, id) => {
    let newState = {... this.state};
    // update curTicket
    newState.summary = ticket.summary;
    newState.description = ticket.description;
    
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
    
    // update state
    this.setState(newState, () => {
    });
  }

  getRole = () => {
    return localStorage.getItem('role');
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
    
    fetch('api/tickets/' + id, { 
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(updatedTicket) 
    }).then(() => {
        this.generateTicketsAfterEdit(ticketData, id)
      });
    
    // change the form to create mode
    let newState = this.state;
    newState.isEdit = false;
    this.setState(newState)
  }

  renderTicketsTable(tickets) {
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
              {this.getRole() === "rd" 
                && <td><button onClick={() => {this.handleResolveTicket(ticket.id)}}>{ticket.isResolved ? 'Unresolve' : 'Resolve'}</button></td>
              }
              {this.getRole() === "qa" 
                && <td><button onClick={() => {this.handleEditTicket(ticket.id, ticket.summary, ticket.description, ticket.isResolved, ticket.creator)}}>Edit</button></td>}
              {this.getRole() === "qa" 
                && <td><button onClick={() => {this.handleDeleteTicket(ticket.id)}}>Del</button></td>}
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
        <h1>Welcome {localStorage.getItem('username')},</h1>
        {this.state.isEdit
        ?
        <div>
          <h1>Edit an existing ticket: </h1>
          <TicketForm parentCallback={this.handleCallBackEditTicket} key={this.state.id} id={this.state.id} summary={this.state.summary} description={this.state.description}></TicketForm>
        </div>
        :
        this.getRole() === "qa" && 
        <div>
          <h1>Create a new ticket: </h1>
          <TicketForm parentCallback={this.handleCallBackCreateTicket}></TicketForm>
        </div>
        }

        {tableContent}
      
      </div>
    );
  }
}

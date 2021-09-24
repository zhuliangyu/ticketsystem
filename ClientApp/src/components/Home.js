import React, { Component } from 'react';

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
        <button onClick={this.handleCreateTicket}>Create Ticket</button>
        {tableContent}


        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, we have also set up:</p>
        <ul>
          <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
          <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
          <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
      </div>
    );
  }
}

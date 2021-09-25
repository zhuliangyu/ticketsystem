import React, { Component } from 'react'

const UserContext = React.createContext(false);

// export const UserProvider = UserContext.Provider;
// export const UserConsumer = UserContext.Consumer;

export class UserProvider extends Component {
	constructor(props) {
		super(props)
		this.updateState = this.updateState.bind(this) // ← Here
		this.state = {
			isLogin: false,
			update: this.updateState // ← Here
		}
	}

	updateState(values) { // ← And here
		this.setState(values)
	}

	render() {
		return (
			<UserContext.Provider value={this.state}>
				{this.props.children}
			</UserContext.Provider>
		)
	}
}

export default UserContext
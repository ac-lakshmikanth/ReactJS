import React, { Component } from 'react';
import Clock from './Clock';
import './App1.css';
import { Form, FormControl, Button } from 'react-bootstrap';

class App1 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			deadline: "December 25, 2017",
			newDeadline: ""
		};
	}

	changeDeadline() {
		this.setState({deadline: this.state.newDeadline});
	}

	render() {
		return (
			<div className="App1">
				<div className="App1Title">Countdown to {this.state.deadline}</div>
				<div><br/></div>
				<Clock deadline={this.state.deadline} newDeadline={''}/>
				<div><br/></div>
				<Form inline>
					<FormControl type="text" placeholder="enter date here" 
						onChange={event => this.setState({newDeadline: event.target.value})}/>
					<Button onClick={() => this.changeDeadline()}>Submit</Button>
				<div><br/></div>
				</Form>
			</div>
		);
	}
}

export default App1;
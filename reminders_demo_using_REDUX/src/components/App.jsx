import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			dueDate: ''
		};
	}

	addReminder() {
		let { text, dueDate } = this.state;
		console.log(moment(new Date(dueDate)).isBefore(moment(new Date())));
		if(moment(new Date(dueDate)).isBefore(moment(new Date()))) {
			alert("Error: past/current date is selected for reminder");
			return;
		}
		this.props.addReminder(text, dueDate);
	}

	deleteReminder(id) {
		this.props.deleteReminder(id);
	}

	clearReminders() {
		this.props.clearReminders();
	}

	renderReminders() {
		const { reminders } = this.props;
		console.log("reminders",reminders);
		return (
			<ul className="list-group">
				{
					reminders.map(reminder => {
						return (
							<li className="list-group-item" key={reminder.id}>
								<div className="list-item">
									<div>{reminder.text}</div>
									<div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
								</div>
								<div className="list-item delete-button">
									<span onClick={() => this.deleteReminder(reminder.id)}>&#x2715;</span>
								</div>
							</li>
						);
					})
				}
			</ul>
		);
	}

	render() {
		console.log('this.props',this.props);
		return (
			<div className="App container">
				<div className="row">
					<div className="col-sm-12 text-center"><h4>Reminder Pro</h4></div>
				</div>
				<div className="row">
					<div className="col-sm-12 text-center">
						<div className="form-inline reminder-form">					
							<div className="form-group">
								<input
									className="form-control"
									placeholder="text..."
									onChange={event => this.setState({text:event.target.value})}
								/>
								<input 
									className="form-control"
									type="datetime-local"
									onChange={event => this.setState({dueDate: event.target.value})}
								/>
								<button type="button" className="btn btn-success" onClick={()=>this.addReminder()}>
									Add Reminder
								</button>
							</div>
						</div>
					</div>
					<div className="col-sm-12">
						<hr/>
					</div>
					<div className="col-sm-12 text-center">
						<div>
							{ this.renderReminders() }
						</div>
					</div>
				</div>
				<div className="row">					
					<div className="col-sm-5 text-center">
						<button type="button" className="btn btn-danger" onClick={() => this.clearReminders()}>
							Clear Reminders	
						</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		reminders: state
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({addReminder,deleteReminder, clearReminders}, dispatch);	
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompleteGoalList from "./CompleteGoalList";

class App extends Component {

	signOut() {
		firebaseApp.auth().signOut();
	}

	render() {
		return (
			<div style={{margin:'5px'}}>
				<h3>Goals</h3>
				<br />
				<AddGoal />
				<hr />
				<GoalList />
				<hr />
				<h4>Complete Goal List</h4>
				<CompleteGoalList />
				<br />
				<div>
					<button className="btn btn-danger" onClick={() => this.signOut()}>Sign Out</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}


export default connect(mapStateToProps,null)(App);
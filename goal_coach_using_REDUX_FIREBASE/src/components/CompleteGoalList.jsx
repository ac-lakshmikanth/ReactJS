import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCompleted } from '../actions';
import { completeGoalRef } from '../firebase';

class CompleteGoalList extends Component {

	componentDidMount() {
		completeGoalRef.on('value', snap => {
			let completedGoals = [];
			snap.forEach(completeGoal => {
				const { email, title, serverKey } = completeGoal.val();
				completedGoals.push({ email, title, serverKey });
			});
			console.log("completedGoals",completedGoals);
			this.props.setCompleted(completedGoals);
		});		
	}

	clearCompleted() {
		completeGoalRef.set([]);
	}

	deleteGoal(key) {
		var g = this.props.completeGoals.filter((goal) => {
			return goal.serverKey!==key;			
		});
		completeGoalRef.set(g);
	}

	render() {
		console.log('this.props.completeGoals',this.props.completeGoals);
		return (
			<div>
				{
					this.props.completeGoals.map((completeGoal,index) => {
						const { title, email, serverKey } = completeGoal;
						console.log("completeGoal",completeGoal);
						return (
							<div key={index} style={{'margin':'5px 5px 5px 0px'}}>
								<div>
									<strong>{title}</strong> completed by <em>{email} </em>
									<button className="btn btn-sm btn-info" onClick={() => this.deleteGoal(serverKey)}>Delete</button>
								</div>
							</div>
						);
					})
				}
				<button className="btn btn-primary" onClick={() => this.clearCompleted()}>Clear All</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { completeGoals } = state;
	return {
		completeGoals
	};
}  

export default connect(mapStateToProps,{setCompleted})(CompleteGoalList);
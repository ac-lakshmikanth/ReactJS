import React, { Component } from 'react';
import { ProgressBar, Form, FormControl, Button, Alert } from 'react-bootstrap';

class Timer extends Component {
	constructor(props) {
		super(props);
		let timeValue = 60;
		this.state = {
			defaultTimer: timeValue,
			timeRemaining: timeValue,
			timerDisplayState: 'hidden',
			intervalState: null,
			startBtnState: ''
		};
	}
	
	onTimerUpdate(input) {
		this.startTimer(this.state.timeRemaining);
	}

	onTimerReset() {
		this.setState({
			timeRemaining: this.state.defaultTimer,
			timerDisplayState: 'hidden',
			startBtnState: ''
		});
		clearInterval(this.state.intervalState);
	}

	onTimerChange(val) {
		if(!val) return;
		clearInterval(this.state.intervalState);
		this.setState({
			timeRemaining: parseInt(val,10),
			timerDisplayState: 'hidden',
			startBtnState: ''
		});
	}

	componentDidMount() {
		//this.startTimer(this.state.timeRemaining);
	}

	startTimer() {
		let i = setInterval(()=> {
			let t = this.state.timeRemaining,
				temp = --t;
			this.setState({
				timeRemaining: temp
			});
			if(temp===0) {
				this.onTimerReset();
			}
		},1000);

		this.setState({
			intervalState: i,
			startBtnState: 'disabled'
		});	
	}

	render() {
		return (
			<div className="text-center">
				<div className="row">
					<div className="col-sm-12">
						<Alert className={this.state.timerDisplayState}>
							<strong>Timer completed</strong>
						</Alert>
					</div>
				</div>
				<div className="row">
					<label className="col-sm-4">Time remaining:</label>
					<div className="col-sm-8"> 
						 <ProgressBar now={this.state.timeRemaining} label={this.state.timeRemaining}/> 
					</div>
				</div>
				<Form horizontal>
					<div className="row">
						<label className="col-sm-4">Time input:</label>
						<div className="col-sm-8"> 
							<FormControl 
								className="input-sm" 
								placeholder="Enter time counter value here"
								onChange={event => this.onTimerChange(event.target.value)}/>
						</div>
					</div>	
					<div className="row"><div className="col-sm-12"><br/></div></div>
					<div>
						<Button onClick={()=>this.onTimerUpdate()} className={this.state.startBtnState}>Start</Button>
						<Button onClick={()=>this.onTimerReset()}>Reset</Button>
					</div>
				</Form>
			</div>
		);
	}
}

export default Timer;
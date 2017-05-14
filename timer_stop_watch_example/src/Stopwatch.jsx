import React, { Component } from 'react';
import Timer from './Timer';
import './Stopwatch.css';

class Stopwatch extends Component {
	render() {
		return (
			<div className="container text-center stop-watch">
				<div className="row">
					<div className="col-sm-12"><h2>Stop watch component</h2></div>
				</div>
				<Timer/>
			</div>
		);
	}
}

export default Stopwatch;
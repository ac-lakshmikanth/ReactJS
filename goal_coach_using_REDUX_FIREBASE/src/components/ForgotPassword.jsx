import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { browserHistory } from 'react-router';
//import { connect } from 'react-redux';

class ForgotPassword extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: '',
			authCode: null,
			error: {
				message: ''
			}
		};
	}

	resetPassword() {
		console.log("resetPassword");
		if(!this.state.email) return;
		firebaseApp.auth().sendPasswordResetEmail(this.state.email)
			.then(response => {
				console.log(response);
				alert("Please check your email for reset password details");
				browserHistory.push('/signin');
			})
			.catch(error => {
				console.log(error);
				this.setState({error});
			});
	}

	confirmPasswordReset() {
		console.log('confirmPasswordReset');
	}


	render() {
		return (
			<div className="form-inline" style={{margin:'5%'}}>
				<div><h3>{this.state.authCode ? 'Update Password' : 'Reset Password'}</h3></div>
				<div className="form-group">
					<input 
						className="form-control"
						type="text"
						placeholder="email id"
						disabled={this.state.authCode}
						onChange={event=> this.setState({email: event.target.value})}
					/>
				</div>
				<div style={{'display':this.state.authCode?'block':'none'}}>
					<div><br /></div>
					<div className="form-group">	
						<input 
							className="form-control"
							type="text"
							placeholder="enter confirmation code"
						/>
					</div>
					<div><br /></div>
					<div className="form-group">	
						<input 
							className="form-control"
							type="text"
							placeholder="new password"
						/>
					</div>
				</div>
				<div><br /></div>
				<div className="form-group">	
					<button className="btn btn-primary" onClick={() => this.state.authCode ? this.confirmPasswordReset() : this.resetPassword()}>
						{this.state.authCode ? 'Update Password' : 'Reset Password'}
					</button>
				</div>
			</div>
		);
	}
}

// function mapStateToProps(state) {
// 	let { user } = state;
// 	return {
// 		user
// 	}
// }

//export default connect(mapStateToProps,null)(ForgotPassword);
export default ForgotPassword;
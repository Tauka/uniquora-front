import React from "react";
// import { browserHistory } from 'react-router';
import { connect } from "react-redux";
import { registerUser } from "../actions/userActions";
import auth from "../css/auth.css";
// import ReactSVG from "react-svg";


@connect((store) => {
	return {
		user: store.users,
	};
})
export default class Auth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authLogin: "",
			authPassword: "",
			authPasswordConfirm: "" 
		}
	};

	// componentWillMount() {
	// 	if (!this.props.user.isAuth) {
	// 		this.props.dispatch(verifyToken(localStorage.getItem("token")));
	// 	}
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.user.isAuth) {
	// 		this.props.router.push('/index');
	// 	}
	// }


	handleChange(event) {

		let authLogin = this.state.authLogin;
		let authPassword = this.state.authPassword;
		let authPasswordConfirm = this.state.authPasswordConfirm;

		if (event.target.className.includes('auth-login')) {
			authLogin = event.target.value;
		} else if (event.target.className.includes('auth-password')) {
			authPassword = event.target.value;
		} else {
			authPasswordConfirm = event.target.value;
		}

		// this.validateNUemail(authLogin);
		this.validatePassword(authLogin, authPassword, authPasswordConfirm);
		// this.autoLogin(authLogin, authPassword);

		this.setState({
			authLogin: authLogin
		});

		this.setState({
			authPassword: authPassword
		});

		this.setState({
			authPasswordConfirm: authPasswordConfirm
		});

	  }

	//  validateNUemail(authLogin) {	
	//  	if (authLogin.includes("@nu.edu.kz")) {
	//  		console.log("NU STUDENT DETECTED");

	//  		if (authLogin != this.state.authLogin) {
	//  			this.props.dispatch(checkIfUserExist({
	//  				email: authLogin
	//  			}));
	//  		}

 // 			this.setState({
 // 				NUconfirm: true
 // 			});
 // 		} else {

 // 			this.props.dispatch(dontCheckUserExist());

 // 			this.setState({
 // 				NUconfirm: false
 // 			});
 // 		}
	 	
	//  }

	//  autoLogin(authLogin, authPassword) {
 // 		if (!this.props.user.isAuth && this.state.authPassword.length >= 5 && this.props.user.userExist) {
	//  		this.props.dispatch(authUser({
	//  			email: authLogin,
	//  			password: authPassword
	//  		}));
	//  	}
	//  }

	 validatePassword(authLogin, authPassword, authPasswordConfirm) {
	 	if (this.state.authPassword.length >= 8 && (authPassword == authPasswordConfirm) && (authPassword != "")) {
	 		//register
	 		console.log("REGISTER");
	 		this.props.dispatch(registerUser({
	 			email: authLogin,
	 			password: authPassword
	 		}));
	 	}
	 	
	 }

	render() {

		let userExistMessage;
		let authPassword;
		let authPasswordConfirm;

		// console.log(this.props.user.userExist);

		// if (this.state.NUconfirm && this.props.user.userExist != null) {
		// 	userExistMessage = this.props.user.userExist ? <h3 class="user-exist">LOGIN</h3> : <h3 class="user-exist">REGISTER</h3>

		// 	if (!this.props.user.userExist) {
				authPasswordConfirm = 
				<div>
					<div class="row">
						<label class="column column-50 column-offset-25 animated fadeIn" for="confirmPasswordField">Confirm Password</label>
					</div>
					<div class="row">
						<input class="column column-50 column-offset-25 animated fadeIn" onChange={this.handleChange.bind(this)} type="password" id="confirmPasswordField"/>
					</div>
				</div> 
		// 	}


			authPassword = 
			<div>
				<div class="row">
					<label class="column column-50 column-offset-25 auth-password-confirm animated fadeIn" for="passwordField">Password</label>
				</div>
				<div class="row">
					<input class="column column-50 column-offset-25 auth-password animated fadeIn" onChange={this.handleChange.bind(this)} type="password" id="passwordField"/>
				</div>
			</div>;
		// }

		


		return (
			
			<div class="auth-block">
				<h1 class="user-exist animated fadeIn">UNIQUORA</h1>
				{userExistMessage}
				<form>
				  <fieldset>
				  	<div class="row">
				    	<label class="column column-50 column-offset-25 animated fadeIn"  for="nameField">Email</label>
				    </div>
				    <div class="row">
				    	<input class="column column-50 column-offset-25 auth-login animated fadeIn" type="text" onChange={this.handleChange.bind(this)} placeholder="tauyekel.kunzhol@nu.edu.kz" id="nameField"/>
				    </div>
				    {authPassword}
				    {authPasswordConfirm}
				  </fieldset>
				</form>
				
			</div>
			);
	}
}
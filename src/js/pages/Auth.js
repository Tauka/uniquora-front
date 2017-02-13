import React from "react";
import { hashHistory } from 'react-router';
import { connect } from "react-redux";
import { registerUser, authorizeUser, logoutUser, userExist, userExistReset } from "../actions/userActions";
import auth from "../css/auth.scss";
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

	componentWillMount() {
		
	}

	componentWillReceiveProps(nextProps) {
		//this works!
		if (nextProps.user.isAuth) {
			this.props.router.push('/');
		}
	}

	//ROUTE TO FEED IF LOGGED IN
	componentWillUpdate() {
		//this won't work, because we're updating props, and change will be reflected on next componentWillUpdate
		//if (this.props.user.isAuth) {
			//this.props.router.push('/');
		//}

		// console.log("COMPONENT WILL UPDATE!");
	}


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

		this.validateNUemail(authLogin);
		this.validatePassword(authLogin, authPassword, authPasswordConfirm);
		this.autoLogin(authLogin, authPassword);

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

	 validateNUemail(authLogin) {	
	 	if (authLogin.includes("@nu.edu.kz")) {
	 		console.log("NU STUDENT DETECTED");

	 		//this handles dispatch when there's typo and user changes only before @nu.edu.kz part
	 		if (authLogin != this.state.authLogin) {
	 			this.props.dispatch(userExist(authLogin));
	 		}

 		} else {

 			this.props.dispatch(userExistReset());
 		}
	 	
	 }

	 autoLogin(authLogin, authPassword) {
 		if (this.state.authPassword.length >= 5 && this.props.user.userExistSuccess) {
	 		this.props.dispatch(authorizeUser({
	 			email: authLogin,
	 			password: authPassword
	 		}));
	 	}
	 }

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

	 // buttonLogin() {
	 // 	this.props.dispatch(authorizeUser({
	 // 		email: this.state.authLogin,
	 // 		password: this.state.authPassword
	 // 	}));
	 // }

	render() {

		let userExistMessage;
		let authPassword;
		let authPasswordConfirm;
		let loading;

		//userExistSuccess == null => response has not been sent; true or false => response has been sent
		if (this.props.user.userExistSuccess != null) {
			userExistMessage = this.props.user.userExistSuccess ? <h5 class="user-exist">LOGIN</h5> : <h5 class="user-exist">REGISTER</h5>

			if (!this.props.user.userExistSuccess) {
				authPasswordConfirm = 
				<div class="input-group">
					<span class="input-group-addon auth-input-addon" id="basic-addon1"><i class="fa fa-unlock fa-lg"></i></span>
					<input type="password" class="form-control auth-password-confirm" onChange={this.handleChange.bind(this)} aria-describedby="basic-addon1"/>
				</div>
			}


			authPassword = 
			<div class="input-group mt-3 mb-3">
				<span class="input-group-addon auth-input-addon" id="basic-addon1"><i class="fa fa-unlock-alt fa-lg"></i></span>
				<input type="password" class="form-control auth-password" onChange={this.handleChange.bind(this)} aria-describedby="basic-addon1"/>
			</div>
		}


		loading = this.props.user.userExistPending ? <h5 class="user-exist-loading"> LOADING </h5> : null;

		


		return (
			
			<div class="auth-block">
				<h1 class="header display-1">UNIQUORA</h1>
				<div class="user-exist-message">
					{userExistMessage}
					{loading}
				</div>
			  	<div class="fields d-flex flex-column">
				    <div class="input-group">
				    	<span class="input-group-addon auth-input-addon" id="basic-addon1"><i class="fa fa-envelope fa-lg"></i></span>
				    	<input type="text" class="form-control auth-login" placeholder="tauyekel.kunzhol@nu.edu.kz" onChange={this.handleChange.bind(this)} aria-describedby="basic-addon1"/>
				    </div>
				    {authPassword}
				    {authPasswordConfirm}
			  	</div>
				
			</div>
			);
	}
}
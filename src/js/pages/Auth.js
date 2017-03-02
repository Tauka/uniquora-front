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
			authPasswordConfirm: "",
			passwordComponentKey: Math.random()
		}
	};

	componentWillMount() {	
		if (this.props.user.isAuth) {
			this.props.router.push('/');
		}

	}

	componentWillReceiveProps(nextProps) {
		// //this works!
		if (nextProps.user.isAuth) {
			this.props.router.push('/');
		}
	}

	componentDidUpdate() {
		console.log("AUTH UPDATE!");
		$('[data-toggle="tooltip"]').tooltip();

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
		} else if (event.target.className.includes('auth-password-pass')) {
			authPassword = event.target.value;
		} else if (event.target.className.includes('auth-password-confirm')){
			authPasswordConfirm = event.target.value;
		}

		console.log("PASSWORD: " + authPassword);
		console.log("CONFIRM: " + authPasswordConfirm);

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

		if (this.props.user.userExistSuccess == null) {
			this.setState({
				authPassword: ""
			});
		}

		if (this.props.user.userExistSuccess == null || !this.props.user.userExistSuccess) {
			this.setState({
				authPasswordConfirm: ""
			});
		}

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

	 	if (authPassword.length >= 8 && (authPassword === authPasswordConfirm) && (authPassword != "")) {
	 		//register
	 		console.log("IN VALIDATE");
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
		let confirmail;
		let passwordTooltip = "Password";



		//userExistSuccess == null => response has not been sent; true or false => response has been sent
		if (this.props.user.userExistSuccess != null) {
			userExistMessage = this.props.user.userExistSuccess ? <h5 class="user-exist">LOGIN</h5> : <h5 class="user-exist">REGISTER</h5>

			if (!this.props.user.userExistSuccess) {
				authPasswordConfirm = 
				<div class="input-group">
					<span class="input-group-addon auth-input-addon" id="basic-addon1"><i class="fa fa-unlock fa-lg"></i></span>
					<input type="password" class="form-control auth-password-confirm" data-toggle="tooltip" data-placement="top" title="Confirm password. When they match, you will be registered automatically" onFocus={() => {$('.auth-password-confirm').tooltip('hide')}}  onChange={this.handleChange.bind(this)} aria-describedby="basic-addon1"/>
				</div>

				passwordTooltip = "New password. 8 characters at least";
			}


			authPassword = 
			<div class="input-group mt-3 mb-3">
				<span class="input-group-addon auth-input-addon" id="basic-addon1"><i class="fa fa-unlock-alt fa-lg"></i></span>
				<input type="password" key={this.state.passwordComponentKey}  ref="passwordComponent" data-toggle="tooltip" data-placement="top" title={`${passwordTooltip}`}  class="form-control auth-password-pass" onFocus={() => {$('.auth-password-pass').tooltip('hide')}} onChange={this.handleChange.bind(this)} aria-describedby="basic-addon1"/>
			</div>
		}


		loading = this.props.user.userExistPending ? <h5 class="user-exist-loading"> LOADING </h5> : null;

		if (this.props.user.userEmailConfirm ) {
			confirmail = <h5 class="user-exist-loading"> CHECK YOUR EMAIL </h5>;
			userExistMessage = null;
		} else {
			confirmail = null;
		}
		
		


		return (
			
			<div class="auth-block">
				<h1 class="header display-1">uniquora</h1>
				<div class="user-exist-message">
					{userExistMessage}
					{loading}
					{confirmail}
				</div>
			  	<div class="fields d-flex flex-column">
				    <div class="input-group">
				    	<span class="input-group-addon auth-input-addon" id="basic-addon1"><i class="fa fa-envelope fa-lg"></i></span>
				    	<input type="text" class="form-control auth-login" data-toggle="tooltip" data-placement="top" title="Your NU email" placeholder="name.lastname@nu.edu.kz" onFocus={() => {$('.auth-login').tooltip('hide')}} onChange={this.handleChange.bind(this)} aria-describedby="basic-addon1"/>
				    </div>
				    {authPassword}
				    {authPasswordConfirm}
			  	</div>
				
			</div>
			);
	}
}
import axios from "axios";
import $ from 'jquery';

//!!!DUMMY LOGIN URL


export function registerUser(newUser) {
	return function(dispatch) {
		dispatch({type: "USER_REGISTER_PENDING"});
		console.log(newUser);
		axios({
			method: "post",
			url: `http://${API_ROOT}/api/register`, 
			data: {
				email: newUser.email,
				password: newUser.password
			}
		})
		.then((response) => {				
			//if registration is successful tell it to reducer and authorize user
			dispatch({type: "USER_REGISTER_SUCCESS"});
			// dispatch(authorizeUser(newUser));
		})
		.catch((err) => {
			dispatch({
				type: "USER_REGISTER_FAIL",
				payload: err
			});
		});
	}
}

export function authorizeUser(user) {
	return function(dispatch) {
		dispatch({type: "USER_AUTHORIZE_PENDING"});
		axios.post(`http://${API_ROOT}/api/login`, {
			email: user.email,
			password: user.password
		})
		.then((response) => {
			dispatch({type: "USER_AUTHORIZE_SUCCESS", payload: user, token: response});

		})
		.catch((err) => {
			dispatch({
				type: "USER_AUTHORIZE_FAIL",
				payload: err
			});
		});
	}
}

export function logoutUser() {
	return function(dispatch, getState) {
		dispatch({type: "USER_LOGOUT_PENDING"});
		axios.get(`http://${API_ROOT}/api/logout`, {
			headers: {'JWT': getState().users.token}
		})
		.then((response) => {
			dispatch({type: "USER_LOGOUT_SUCCESS"});

		})
		.catch((err) => {
			dispatch({
				type: "USER_LOGOUT_FAIL",
				payload: err
			});
		});
	}
}

export function verifyToken(token) {
	return {
		type: "VERIFY_TOKEN",
		token: token
	}
}
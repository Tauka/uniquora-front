import axios from "axios";
import $ from 'jquery';

export const userActions = {
	USER_REGISTER_PENDING: "USER_REGISTER_PENDING",
	USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
	USER_REGISTER_FAIL: "USER_REGISTER_FAIL",
	USER_AUTHORIZE_PENDING: "USER_AUTHORIZE_PENDING",
	USER_AUTHORIZE_SUCCESS: "USER_AUTHORIZE_SUCCESS",
	USER_AUTHORIZE_FAIL: "USER_AUTHORIZE_FAIL",
	UNAUTHORIZED_REQUEST: "UNAUTHORIZED_REQUEST",
	USER_LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS",
	USER_EXIST_PENDING: "USER_EXIST_PENDING",
	USER_EXIST_SUCCESS: "USER_EXIST_SUCCESS",
	USER_EXIST_FAIL: "USER_EXIST_FAIL",
	USER_EXIST_RESET: "USER_EXIST_RESET",
	USER_EXIST_NOTSUCCESS: "USER_EXIST_NOTSUCCESS"
}

//!!!DUMMY LOGIN URL


export function registerUser(newUser) {
	return function(dispatch) {
		dispatch({type: userActions.USER_REGISTER_PENDING});
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
			dispatch({type: userActions.USER_REGISTER_SUCCESS});
			// dispatch(authorizeUser(newUser));
		})
		.catch((err) => {
			dispatch({
				type: userActions.USER_REGISTER_FAIL,
				payload: err
			});
		});
	}
}

export function authorizeUser(user) {
	return function(dispatch) {
		dispatch({type: userActions.USER_AUTHORIZE_PENDING});
		axios.post(`http://${API_ROOT}/api/login`, {
			email: user.email,
			password: user.password
		})
		.then((response) => {
			dispatch({type: userActions.USER_AUTHORIZE_SUCCESS, payload: user, token: response.data});

		})
		.catch((err) => {
			dispatch({
				type: userActions.USER_AUTHORIZE_FAIL,
				payload: err
			});
		});
	}
}

export function logoutUser() {
	// return function(dispatch, getState) {
		// dispatch({type: userActions.USER_LOGOUT_PENDING});
		// axios.get(`http://${API_ROOT}/api/logout`, {
		// 	headers: {'JWT': getState().users.token}
		// })
		// .then((response) => {
			return {
				type: userActions.USER_LOGOUT_SUCCESS
			}

		// })
		// .catch((err) => {
		// 	dispatch({
		// 		type: userActions.USER_LOGOUT_FAIL,
		// 		payload: err
		// 	});
		// });
	// }
}

export function userExist(email) {
	return function(dispatch) {
		dispatch({type: userActions.USER_EXIST_PENDING});
		axios.get(`http://${API_ROOT}/api/isregistered?email=${email}`)
		.then((response) => {
			console.log(response);
			if (response.data == true) {
				dispatch({type: userActions.USER_EXIST_SUCCESS});
			} else {
				dispatch({type: userActions.USER_EXIST_NOTSUCCESS});
			}
		})
		.catch((err) => {
			dispatch({
				type: userActions.USER_EXIST_FAIL,
				payload: err
			})
		})
	}
}

export function userExistReset() {
	return {
		type: userActions.USER_EXIST_RESET
	}
}

export function unauthorizedRequest() {
	return {
		type: userActions.UNAUTHORIZED_REQUEST
	}
}
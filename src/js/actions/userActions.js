import axios from "axios";
import $ from 'jquery';

//!!!DUMMY LOGIN URL


export function registerUser(newUser) {
	return function(dispatch) {
		dispatch({type: "USER_REGISTER_PENDING"});
		console.log(newUser);
		// axios({
		// 	method: "post",
		// 	url: `http://${API_ROOT}/api/register`, 
		// 	data: {
		// 		email: newUser.email,
		// 		password: newUser.password
		// 	}
		// })
		// .then((response) => {				
		// 	//if registration is successful tell it to reducer and authorize user
		// 	dispatch({type: "USER_REGISTER_SUCCESS"});
		// 	dispatch(authorizeUser(response.user));
		// })
		// .catch((err) => {
		// 	dispatch({
		// 		type: "USER_REGISTER_FAIL",
		// 		payload: err
		// 	});
		// });

		$.post(`http://${API_ROOT}/api/register`,
		    {
		        email: "tauka@nu.edu.kz",
		        password: "123123123123"
		    },
		    function(data, status){
		        alert("Data: " + data + "\nStatus: " + status);
		    });
	}
}

export function authorizeUser(user) {
	return function(dispatch) {
		dispatch({type: "USER_AUTHORIZE_PENDING"});
		axios.get(`http://${API_ROOT}/api/login`, {
			email: user.email,
			password: user.password
		})
		.then((response) => {
			dispatch({type: "USER_AUTHORIZE_SUCCESS", payload: response.user});

		})
		.catch((err) => {
			dispatch({
				type: "USER_AUTHORIZE_FAIL",
				payload: err
			});
		});
	}
}
//NO TOKEN VALIDATION, ASSUMES TOKEN IS VALID BY DEFAULT

export default function reducer(state={
	authorizedUser: {},
	registerPending: false,
	registerSuccess: false,
	authorizePending: false,
	logoutPending: false,
	isAuth: false,
	token: "",
	error: null	
}, action) {
	switch(action.type) {
		case "USER_REGISTER_PENDING": {
			return {...state, registerPending: true}
		}
		case "USER_REGISTER_SUCCESS": {
			return {...state, registerPending: false, registerSuccess: true}
		}
		case "USER_REGISTER_FAIL": {
			return {...state, registerPending: false, registerSuccess: false, error: action.payload}
		}
		case "USER_AUTHORIZE_PENDING": {
			return {...state, authorizePending: true}
		}
		case "USER_AUTHORIZE_SUCCESS": {
			localStorage.setItem("token", action.token);
			return {...state, authorizePending: false, isAuth: true, authorizedUser: action.payload, token: action.token}
		}
		case "USER_AUTHORIZE_FAIL": {
			return {...state, authorizePending: false, isAuth: false, error: action.payload}
		}
		case "USER_LOGOUT_PENDING": {
			return {...state, logoutPending: true}
		}
		case "USER_LOGOUT_SUCCESS": {
			localStorage.removeItem("token");
			return {...state, logoutPending: false, isAuth: false}
		}
		case "USER_LOGOUT_FAIL": {
			return {...state, logoutPending: false, error: action.payload}
		}
		case "VERIFY_TOKEN": {
			return {...state, isAuth: true, token: action.token}
		}
	}

	return state;
}
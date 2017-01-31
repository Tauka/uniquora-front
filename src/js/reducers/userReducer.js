//NO TOKEN VALIDATION, ASSUMES TOKEN IS VALID BY DEFAULT
import { userActions } from "../actions/userActions";

export default function reducer(state={
	authorizedUser: {},
	registerPending: false,
	registerSuccess: false,
	authorizePending: false,
	logoutPending: false,
	isAuth: true,
	token: localStorage.getItem("token"),
	userExistPending: false,
	userExistSuccess: null,
	error: null	
}, action) {
	switch(action.type) {
		case userActions.USER_REGISTER_PENDING: {
			return {...state, registerPending: true}
		}
		case userActions.USER_REGISTER_SUCCESS: {
			return {...state, registerPending: false, registerSuccess: true}
		}
		case userActions.USER_REGISTER_FAIL: {
			return {...state, registerPending: false, registerSuccess: false, error: action.payload}
		}
		case userActions.USER_AUTHORIZE_PENDING: {
			return {...state, authorizePending: true}
		}
		case userActions.USER_AUTHORIZE_SUCCESS: {
			localStorage.setItem("token", action.token);
			console.log("in fucking reducer");
			return {...state, authorizePending: false, isAuth: true, authorizedUser: action.payload, token: action.token}
		}
		case userActions.USER_AUTHORIZE_FAIL: {
			return {...state, authorizePending: false, isAuth: false, error: action.payload}
		}
		// case userActions.USER_LOGOUT_PENDING: {
		// 	return {...state, logoutPending: true}
		// }
		case userActions.USER_LOGOUT_SUCCESS: {
			localStorage.removeItem("token");
			return {...state, logoutPending: false, isAuth: false, userExistSuccess: null, token: null}
		}
		// case userActions.USER_LOGOUT_FAIL: {
		// 	return {...state, logoutPending: false, error: action.payload}
		// }
		case userActions.UNAUTHORIZED_REQUEST: {
			localStorage.removeItem("token");
			return {...state, isAuth: false, token: ""}
		}
		case userActions.USER_EXIST_PENDING: {
			return {...state, userExistPending: true}
		}
		case userActions.USER_EXIST_SUCCESS: {
			return {...state, userExistSuccess: true, userExistPending: false}
		}
		case userActions.USER_EXIST_RESET: {
			return {...state, userExistSuccess: null}
		}
		case userActions.USER_EXIST_NOTSUCCESS: {
			return {...state, userExistSuccess: false, userExistPending: false}
		}
		case userActions.USER_EXIST_FAIL: {
			return {...state, userExistSuccess: null, userExistPending: false, error: action.payload}
		}
	}

	return state;
}
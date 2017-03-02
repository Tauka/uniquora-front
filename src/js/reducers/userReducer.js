//NO TOKEN VALIDATION, ASSUMES TOKEN IS VALID BY DEFAULT
import { userActions } from "../actions/userActions";

export default function reducer(state={
	authorizedUser: {},
	registerPending: false,
	registerSuccess: false,
	authorizePending: false,
	userInfoPending: false,
	userInfoSuccess: false,
	logoutPending: false,
	isAuth: true,
	token: localStorage.getItem("token"),
	userExistPending: false,
	userExistSuccess: null,
	userInDB: null,
	userEmailConfirm: false,
	error: null	
}, action) {
	switch(action.type) {
		case userActions.USER_REGISTER_PENDING: {
			return {...state, registerPending: true}
		}
		case userActions.USER_REGISTER_SUCCESS: {
			return {...state, registerPending: false, registerSuccess: true, userExistPending: false, userExistSuccess: null, userEmailConfirm: true}
		}
		case userActions.USER_REGISTER_FAIL: {
			return {...state, registerPending: false, registerSuccess: false, error: action.payload}
		}
		case userActions.USER_AUTHORIZE_PENDING: {
			return {...state, authorizePending: true}
		}
		case userActions.USER_AUTHORIZE_SUCCESS: {
			localStorage.setItem("token", action.token);
			console.log(action.payload);
			return {...state, authorizePending: false, isAuth: true, token: action.token}
		}
		case userActions.USER_AUTHORIZE_FAIL: {
			return {...state, authorizePending: false, isAuth: false, error: action.payload}
		}
		case userActions.USER_GET_INFO_PENDING: {
			return {...state, userInfoPending: true, userInfoSuccess: false}
		}
		case userActions.USER_GET_INFO_SUCCESS: {
			return {...state, userInfoPending: false, userInfoSuccess: true, authorizedUser: action.user}
		}
		case userActions.USER_GET_INFO_FAIL: {
			return {...state, userInfoPending: false, userInfoSuccess: false}
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
			return {...state, userExistPending: true, userEmailConfirm: false}
		}
		case userActions.USER_EXIST_SUCCESS: {
			return {...state, userExistSuccess: true, userInDB: true, userExistPending: false, userEmailConfirm: false}
		}
		case userActions.USER_EXIST_RESET: {
			return {...state, userExistSuccess: null, userEmailConfirm: false, userInDB: null}
		}
		case userActions.USER_EXIST_NOTSUCCESS: {
			return {...state, userExistSuccess: false, userInDB: true, userExistPending: false}
		}
		case userActions.USER_NOT_IN_DB: {
			return{...state, userExistSuccess: false, userInDB: false, userExistPending: false}
		}
		case userActions.USER_EXIST_FAIL: {
			return {...state, userExistSuccess: null, userExistPending: false, error: action.payload}
		}
		case userActions.CONFIRM_EMAIL: {
			return {...state, }
		}
	}

	return state;
}
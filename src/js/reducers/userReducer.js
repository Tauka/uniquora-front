export default function reducer(state={
	authorizedUser: {},
	registerPending: false,
	registerSuccess: false,
	authorizePending: false,
	isAuth: false,
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
			return {...state, authorizePending: false, isAuth: true, authorizedUser: action.payload}
		}
		case "USER_AUTHORIZE_FAIL": {
			return {...state, authorizePending: false, isAuth: false, error: action.payload}
		}
	}

	return state;
}
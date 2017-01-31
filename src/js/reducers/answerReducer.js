import { answerActions } from "../actions/answerActions";

export default function reducer(state={
	answers: [],
	answerPending: false,
	answerSuccess: false,
	answerFetching: false,
	answerFetched: false,
	error: null
}, action) {
	switch(action.type) {
		case answerActions.ANSWER_FETCH_PENDING: {
			return {...state, answerFetching: true}
		}
		case answerActions.ANSWER_FETCH_SUCCESS: {
			return {...state, answerFetching: false, answerFetched: false, error: action.payload}
		}
		case answerActions.ANSWER_FETCH_FAIL: {
			return {...state, answerFetching: false, answerFetched: false, pins: action.payload}
		}
		case answerActions.ANSWER_ADD_PENDING: {
			return {...state, answerPending: true}
		}
		case answerActions.ANSWER_ADD_SUCCESS: {
			return {...state, answerPending: false, answerSuccess: true}
		}
		case answerActions.ANSWER_ADD_FAIL: {
			return {...state, answerPending: false, answerSuccess: false}
		}
	}

	return state;
}
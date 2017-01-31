import { questionActions } from "../actions/questionActions";

export default function reducer(state={
	questions: [],
	extendedQuestion: {},
	questionAddPending: false,
	questionAddSuccess: false,
	questionGetPending: false,
	questionGetSuccess: false,
	questionGetError: null,
	questionsFetchSuccess: false,
	questionsFetchPending: false,
	error: null
}, action) {
	switch(action.type) {
		case questionActions.QUESTIONS_FETCH_PENDING: {
			return {...state, questionsFetchPending: true}
		}
		case questionActions.QUESTIONS_FETCH_SUCCESS: {
			return {...state, questionsFetchPending: false, questionsFetchSuccess: true, questions: [...action.payload.data]}
		}
		case questionActions.QUESTIONS_FETCH_FAIL: {
			return {...state, questionsFetching: false, questionsFetchSuccess: false, error: action.payload}
		}
		case questionActions.QUESTION_GET_PENDING: {
			return {...state, questionGetPending: true, questionGetSuccess: false}
		}
		case questionActions.QUESTION_GET_SUCCESS: {
			return {...state, questionGetPending: false, questionGetSuccess: true, extendedQuestion: action.payload}
		}
		case questionActions.QUESTION_GET_FAIL: {
			return {...state, questionGetPending: false, questionGetSuccess: false, questionGetError: action.payload}
		}
		case questionActions.QUESTION_ADD_PENDING: {
			return {...state, questionAddPending: true, questionAddSuccess: false}
		}
		case questionActions.QUESTION_ADD_SUCCESS: {
			return {...state, questionAddPending: false, questionAddSuccess: true}
		}
		case questionActions.QUESTION_ADD_FAIL: {
			return {...state, questionAddPending: false, questionAddSuccess: false}
		}
	}

	return state;
}
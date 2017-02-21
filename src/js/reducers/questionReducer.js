import { questionActions } from "../actions/questionActions";

export default function reducer(state={
	questions: [],
	extendedQuestion: {},
	questionAddPending: false,
	questionAddSuccess: false,
	questionGetPending: false,
	questionGetSuccess: false,
	questionGetError: null,
	questionsEmpty: false,
	loadedPage: 0,
	coursesGetPending: false,
	coursesGetSuccess: false,
	courses: [],
	questionsFetchSuccess: false,
	questionsFetchPending: false,
	questionsFetchInitialPending: false,
	error: null
}, action) {
	switch(action.type) {
		case questionActions.QUESTIONS_FETCH_PENDING: {
			let initPend = false;

			if (state.loadedPage == 0) {
				initPend = true;
			}

			return {...state, questionsFetchPending: true, questionsFetchInitialPending: initPend}
		}
		case questionActions.QUESTIONS_FETCH_SUCCESS: {
			return {...state, questionsFetchPending: false, questionsFetchSuccess: true, questions: [...state.questions, ...action.payload.data], questionsFetchInitialPending: false, loadedPage: state.loadedPage + 1}
		}
		case questionActions.QUESTIONS_FETCH_EMPTY: {
			return {...state, questionsFetchPending: false, questionsFetchSuccess: true, questionsEmpty: true}
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
			return {...state, questionAddPending: false, questionAddSuccess: true, questions: [...state.questions, action.newQuestion]}
		}
		case questionActions.QUESTION_ADD_FAIL: {
			return {...state, questionAddPending: false, questionAddSuccess: false}
		}
		case questionActions.COURSES_GET_PENDING: {
			return {...state, coursesGetPending: true, coursesGetSuccess: false}
		}
		case questionActions.COURSES_GET_SUCCESS: {
			return {...state, coursesGetPending: false, coursesGetSuccess: true, courses: action.courses}
		}
		case questionActions.COURSES_GET_FAIL: {
			return {...state, coursesGetPending: false, coursesGetSuccess: false, error: action.payload}
		}
	}

	return state;
}
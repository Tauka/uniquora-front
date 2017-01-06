export default function reducer(state={
	questions: [],
	questionPending: false,
	questionSuccess: false,
	questionFetching: false,
	questionFetched: false,
	error: null
}, action) {
	switch(action.type) {
		case "QUESTIONS_FETCH_PENDING": {
			return {...state, questionFetching: true}
		}
		case "QUESTIONS_FETCH_SUCCESS": {
			return {...state, questionFetching: false, questionFetched: false, error: action.payload}
		}
		case "QUESTIONS_FETCH_FAIL": {
			return {...state, questionFetching: false, questionFetched: false, pins: action.payload}
		}
		case "QUESTION_ADD_PENDING": {
			return {...state, questionPending: true}
		}
		case "QUESTION_ADD_SUCCESS": {
			return {...state, questionPending: false, questionSuccess: true}
		}
		case "QUESTION_ADD_FAIL": {
			return {...state, questionPending: false, questionSuccess: false}
		}
	}

	return state;
}
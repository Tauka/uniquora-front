import { answerActions } from "../actions/answerActions";

export default function reducer(state={
	answers: [],
	answerPending: false,
	answerSuccess: false,
	answerFetching: false,
	answerFetched: false,
	answers: null,
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
			return {...state, answerPending: true, answerSuccess: false}
		}
		case answerActions.ANSWER_ADD_SUCCESS: {

			// state.answers[`${action.newAnswer.id}`] = action.newAnswer;
			let newAnswers = Object.assign({}, state.answers);
			newAnswers[`${action.newAnswer.id}`] = action.newAnswer;

			return {...state, answerPending: false, answerSuccess: true, answers: newAnswers}
		}
		case answerActions.ANSWER_EDIT_PENDING: {
			return {...state, answerPending: true, answerSuccess: false}
		}
		case answerActions.ANSWER_EDIT_SUCCESS: {

			let newAnswers = Object.assign({}, state.answers);
			newAnswers[`${action.editAnswer.id}`] = action.editAnswer;

			return {...state, answerPending: false, answerSuccess: true, answers: newAnswers}
		}
		case answerActions.ANSWER_REMOVE_SUCCESS: {
			let newAnswers = Object.assign({}, state.answers);
			delete newAnswers[`${action.removeAnswer.id}`];

			//for some reason, this does not work in promise
			//so I put it here
			$("#deleteModal").modal('hide');

			return {...state, answerPending: false, answerSuccess: true, answers: newAnswers}
		}
		case answerActions.ANSWER_ADD_FAIL: {
			return {...state, answerPending: false, answerSuccess: false}
		}
		case answerActions.ANSWER_UPDATE: {
			return {...state, answers: action.answers}
		}
	}

	return state;
}
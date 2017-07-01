import axios from "axios";
import { getQuestion, updateLatestAnswer } from "./questionActions";
export const answerActions = {
	ANSWER_FETCH_PENDING: "ANSWER_FETCH_PENDING",
	ANSWER_FETCH_SUCCESS: "ANSWER_FETCH_SUCCESS",
	ANSWER_FETCH_FAIL: "ANSWER_FETCH_FAIL",
	ANSWER_ADD_PENDING: "ANSWER_ADD_PENDING",
	ANSWER_ADD_SUCCESS: "ANSWER_ADD_SUCCESS",
	ANSWER_ADD_FAIL: "ANSWER_ADD_FAIL",
	ANSWER_UPDATE: "ANSWER_UPDATE",
	ANSWER_EDIT_PENDING: "ANSWER_EDIT_PENDING",
	ANSWER_EDIT_SUCCESS: "ANSWER_EDIT_SUCCESS",
	ANSWER_EDIT_FAIL: "ANSWER_EDIT_FAIL"
}

//!!!DUMMY ANSWER URL


export function fetchAnswers() {
	return function(dispatch) {
		dispatch({type: answerActions.ANSWER_FETCH_PENDING});
		axios.get(`http://${API_ROOT}/api/answer`)
		.then((response) => {				
			dispatch({type: answerActions.ANSWER_FETCH_SUCCESS});
			dispatch(authorizeUser(response.user));
		})
		.catch((err) => {
			dispatch({
				type: answerActions.ANSWER_FETCH_FAIL,
				payload: err.response.data
			});
		});
	}
}

export function addAnswer(answer) {
	return function(dispatch, getState) {
		dispatch({type: answerActions.ANSWER_ADD_PENDING});
		return axios.post(`http://${API_ROOT}/api/answers/save`, answer,
		{
			headers: {'JWT': getState().users.token}
		})
		.then((response) => {
			console.log(response.data);
			dispatch({type: answerActions.ANSWER_ADD_SUCCESS, newAnswer: response.data});
			dispatch(updateLatestAnswer(answer.questionId, response.data));
			// dispatch(getQuestion(answer.questionId));

		})
		.catch((err) => {
			dispatch({
				type: answerActions.ANSWER_ADD_FAIL,
				payload: err.response.data
			});
		});
	}
}

export function editAnswer(answer) {
	return function(dispatch, getState) {
		dispatch({type: answerActions.ANSWER_EDIT_PENDING});
		return axios.post(`http://${API_ROOT}/api/answers/edit`, answer,
		{
			headers: {'JWT': getState().users.token}
		})
		.then((response) => {
			console.log(response.data);
			dispatch({type: answerActions.ANSWER_EDIT_SUCCESS, editAnswer: response.data});
			// dispatch(updateLatestAnswer(answer.questionId, response.data));
			// dispatch(getQuestion(answer.questionId));

		})
		.catch((err) => {
			dispatch({
				type: answerActions.ANSWER_EDIT_FAIL,
				payload: err.response.data
			});
		});
	}
}

export function updateAnswers(answers) {
	return {
		type: answerActions.ANSWER_UPDATE,
		answers: answers
	}
}
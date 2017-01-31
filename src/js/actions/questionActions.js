import axios from "axios";
import { unauthorizedRequest } from "./userActions";

export const questionActions = {
	QUESTIONS_FETCH_PENDING: "QUESTIONS_FETCH_PENDING",
	QUESTIONS_FETCH_SUCCESS: "QUESTIONS_FETCH_SUCCESS",
	QUESTIONS_FETCH_FAIL: "QUESTIONS_FETCH_FAIL",
	QUESTION_GET_SUCCESS: "QUESTION_GET_SUCCESS",
	QUESTION_GET_PENDING: "QUESTION_GET_PENDING",
	QUESTION_GET_FAIL: "QUESTION_GET_FAIL",
	QUESTION_ADD_PENDING: "QUESTION_ADD_PENDING",
	QUESTION_ADD_SUCCESS: "QUESTION_ADD_SUCCESS",
	QUESTION_ADD_FAIL: "QUESTION_ADD_FAIL"
}
//!!!DUMMY QUESTIONS URL


export function fetchQuestions() {
	return function(dispatch, getState) {
		dispatch({type: questionActions.QUESTIONS_FETCH_PENDING});
		axios.get(`http://${API_ROOT}/api/questions/list`, {
			headers: {'JWT': getState().users.token}
		})
		.then((response) => {				
			//if registration is successful tell it to reducer and authorize user
			dispatch({type: questionActions.QUESTIONS_FETCH_SUCCESS, payload: response.data});
		})
		.catch((err) => {
			if (err.response != undefined && err.response.data == "login") {
				dispatch(unauthorizedRequest());
			}

			dispatch({
				type: questionActions.QUESTIONS_FETCH_FAIL,
				payload: err
			});
		});
	}
}

export function getQuestion(questionId) {
	return function(dispatch, getState) {
		dispatch({type: questionActions.QUESTION_GET_PENDING});
		axios.get(`http://${API_ROOT}/api/questions/get/${questionId}`, {
			headers: {'JWT': getState().users.token}
		})
		.then((response) => {				
			//if registration is successful tell it to reducer and authorize user
			dispatch({type: questionActions.QUESTION_GET_SUCCESS, payload: response.data});
		})
		.catch((err) => {
			if (err.response != undefined && err.response.data == "login") {
				dispatch(unauthorizedRequest());
			}

			dispatch({
				type: questionActions.QUESTION_GET_FAIL,
				payload: err
			});
		});
	}
}

export function addQuestion(question) {
	return function(dispatch, getState) {
		dispatch({type: questionActions.QUESTION_ADD_PENDING, payload: question});
		axios({
			url: `http://${API_ROOT}/api/questions/save`,
			method: "post",
			data: {
				title: question.title,
				text: question.text,
				courseId: question.courseId,
				isAnonymous: question.isAnonymous
			},
			headers: {
			'JWT': getState().users.token
			}
		})
		.then((response) => {
			dispatch({type: questionActions.QUESTION_ADD_SUCCESS, payload: response.user});
			dispatch(fetchQuestions());

		})
		.catch((err) => {
			dispatch({
				type: questionActions.QUESTION_ADD_FAIL,
				payload: err.response.data
			});
		});
	}
}
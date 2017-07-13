import axios from "axios";
import { unauthorizedRequest } from "./userActions";
import { updateAnswers } from "./answerActions";
import { normalize, schema } from 'normalizr';

export const questionActions = {
	QUESTIONS_FETCH_PENDING: "QUESTIONS_FETCH_PENDING",
	QUESTIONS_FETCH_SUCCESS: "QUESTIONS_FETCH_SUCCESS",
	QUESTIONS_FETCH_EMPTY: "QUESTIONS_FETCH_EMPTY",
	QUESTIONS_FETCH_FAIL: "QUESTIONS_FETCH_FAIL",
	QUESTION_GET_SUCCESS: "QUESTION_GET_SUCCESS",
	QUESTION_GET_PENDING: "QUESTION_GET_PENDING",
	QUESTION_GET_FAIL: "QUESTION_GET_FAIL",
	QUESTION_ADD_PENDING: "QUESTION_ADD_PENDING",
	QUESTION_ADD_SUCCESS: "QUESTION_ADD_SUCCESS",
	QUESTION_ADD_FAIL: "QUESTION_ADD_FAIL",
	COURSES_GET_PENDING: "COURSES_GET_PENDING",
	COURSES_GET_SUCCESS: "COURSES_GET_SUCCESS",
	COURSES_GET_FAIL: "COURSES_GET_FAIL",
	UPDATE_LATEST_ANSWER: "UPDATE_LATEST_ANSWER"
}
//!!!DUMMY QUESTIONS URL


export function fetchQuestions(page) {
	return function(dispatch, getState) {
		dispatch({type: questionActions.QUESTIONS_FETCH_PENDING});
		axios.get(`http://${API_ROOT}/api/questions/list?page=${page}`, {
			headers: {'JWT': getState().users.token}
		})
		.then((response) => {				
			//if registration is successful tell it to reducer and authorize user
			if (response.data.count > 0) {
				dispatch({type: questionActions.QUESTIONS_FETCH_SUCCESS, payload: response.data, page: page});
			} else {
				dispatch({type: questionActions.QUESTIONS_FETCH_EMPTY})
			}
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
			// const user = new schema.Entity('users');
			const answer = new schema.Entity('answers', {
				// creator: user
			});
			const question = new schema.Entity('questions', {
				// creator: user,
				answerList: [ answer ]
			});


			const normalizedQuestion = normalize(response.data, question);
			console.log(normalizedQuestion);
			dispatch({type: questionActions.QUESTION_GET_SUCCESS, payload: response.data});
			dispatch(updateAnswers(normalizedQuestion.entities.answers));

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

export function fetchCourses() {
	return function(dispatch, getState) {
		dispatch({type: questionActions.COURSES_GET_PENDING});
		axios.get(`http://${API_ROOT}/api/courses/list`, {
			headers: {'JWT': getState().users.token}
		})
		.then((response) => {				
			dispatch({type: questionActions.COURSES_GET_SUCCESS, courses: response.data});

		})
		.catch((err) => {
			dispatch({
				type: questionActions.COURSES_GET_FAIL,
				payload: err
			});
		});
	}
}

export function updateLatestAnswer(questionId, answer) {
	return {
		type: questionActions.UPDATE_LATEST_ANSWER,
		answer: answer,
		questionId: questionId
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
			console.log(response.data);
			dispatch({type: questionActions.QUESTION_ADD_SUCCESS, newQuestion: response.data});

		})
		.catch((err) => {
			dispatch({
				type: questionActions.QUESTION_ADD_FAIL,
				payload: err.response.data
			});
		});
	}
}
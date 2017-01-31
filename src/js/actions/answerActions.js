import axios from "axios";
export const answerActions = {
	ANSWER_FETCH_PENDING: "ANSWER_FETCH_PENDING",
	ANSWER_FETCH_SUCCESS: "ANSWER_FETCH_SUCCESS",
	ANSWER_FETCH_FAIL: "ANSWER_FETCH_FAIL",
	ANSWER_ADD_PENDING: "ANSWER_ADD_PENDING",
	ANSWER_ADD_SUCCESS: "ANSWER_ADD_SUCCESS",
	ANSWER_ADD_FAIL: "ANSWER_ADD_FAIL"
}

//!!!DUMMY ANSWER URL


export function fetchAnswers() {
	return function(dispatch) {
		dispatch({type: answerActions.ANSWER_FETCH_PENDING});
		axios.get(`http://${API_ROOT}/api/answer`)
		.then((response) => {				
			//if registration is successful tell it to reducer and authorize user
			dispatch({type: answerActions.ANSWER_FETCH_SUCCESS});
			dispatch(authorizeUser(response.user));
		})
		.catch((err) => {
			dispatch({
				type: answerActions.ANSWER_FETCH_FAIL,
				payload: err
			});
		});
	}
}

export function addAnswer(question) {
	return function(dispatch, getState) {
		dispatch({type: answerActions.ANSWER_ADD_PENDING});
		axios.post(`http://${API_ROOT}/api/answers/save`, question,
		{
			headers: {'JWT': getState().users.token}
		})
		.then((response) => {
			dispatch({type: answerActions.ANSWER_ADD_SUCCESS, payload: response.user});

		})
		.catch((err) => {
			dispatch({
				type: answerActions.ANSWER_ADD_FAIL,
				payload: err.response.data
			});
		});
	}
}
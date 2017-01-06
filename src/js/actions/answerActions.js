import axios from "axios";

//!!!DUMMY ANSWER URL


export function fetchAnswers() {
	return function(dispatch) {
		dispatch({type: "ANSWER_FETCH_PENDING"});
		axios.get(`http://${API_ROOT}/api/answer`)
		.then((response) => {				
			//if registration is successful tell it to reducer and authorize user
			dispatch({type: "ANSWER_FETCH_SUCCESS"});
			dispatch(authorizeUser(response.user));
		})
		.catch((err) => {
			dispatch({
				type: "ANSWER_FETCH_FAIL",
				payload: err
			});
		});
	}
}

export function addAnswer(question) {
	return function(dispatch) {
		dispatch({type: "ANSWER_ADD_PENDING"});
		axios.post(`http://${API_ROOT}/api/answer`, {
			question: question
		})
		.then((response) => {
			dispatch({type: "ANSWER_ADD_SUCCESS", payload: response.user});

		})
		.catch((err) => {
			dispatch({
				type: "ANSWER_ADD_FAIL",
				payload: err
			});
		});
	}
}
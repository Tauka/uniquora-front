import axios from "axios";

//!!!DUMMY QUESTIONS URL


export function fetchQuestions() {
	return function(dispatch) {
		dispatch({type: "QUESTION_FETCH_PENDING"});
		axios.get(`http://${API_ROOT}/api/courses`, {
			headers: {'JWT': getState().users.token}
		})
		.then((response) => {				
			//if registration is successful tell it to reducer and authorize user
			dispatch({type: "QUESTION_FETCH_SUCCESS", payload: response});
		})
		.catch((err) => {
			dispatch({
				type: "QUESTION_FETCH_FAIL",
				payload: err
			});
		});
	}
}

export function addQuestion(question) {
	return function(dispatch) {
		dispatch({type: "QUESTION_ADD_PENDING"});
		axios.post(`http://${API_ROOT}/api/questions`, {
			question: question
		})
		.then((response) => {
			dispatch({type: "QUESTION_ADD_SUCCESS", payload: response.user});

		})
		.catch((err) => {
			dispatch({
				type: "QUESTION_ADD_FAIL",
				payload: err
			});
		});
	}
}
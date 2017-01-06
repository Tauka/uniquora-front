import axios from "axios";

//!!!DUMMY QUESTIONS URL


export function fetchQuestions() {
	return function(dispatch) {
		dispatch({type: "USER_REGISTER_PENDING"});
		axios.get(`http://${API_ROOT}/api/questions`)
		.then((response) => {				
			//if registration is successful tell it to reducer and authorize user
			dispatch({type: "USER_REGISTER_SUCCESS"});
			dispatch(authorizeUser(response.user));
		})
		.catch((err) => {
			dispatch({
				type: "USER_REGISTER_FAIL",
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
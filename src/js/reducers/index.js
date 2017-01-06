import { combineReducers } from "redux";
import users from "./userReducer";
import questions from "./questionReducer";
import answers from "./answerReducer";


export default combineReducers({
	users,
	questions,
	answers
})
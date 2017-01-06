import React from 'react';
import questionFeed from '../components/questionFeed';
import { connect } from "react-redux";
import { fetchQuestions, addQuestion } from "../actions/questionsActions";
import from '../css/feed.css';


@connect((store) => {
	return {
		questions: store.questions,
	};
})
export default class Feed extends React.Component {
	render() {
		//TODO
		//SET UP HOOKS FOR FETCHING QUESTIONS

		//SET UP INPUT FIELDS FOR ADDING QUESTION

		//ONCLICK EVENT FOR ROUTING TO EXTENDED QUESTION AND PASSING INFO TO IT

		//I DON'T KNOW STRUCTURE OF EACH QUESTION OBJECT YET
		//FOR NOW I PASS WHOLE OBJECT TO QUESTION_FEED COMPONENT
		let questions = this.props.questions.map((question) => {<questionFeed question={question}/>});

		return (
			{questions}
		);
	}
}
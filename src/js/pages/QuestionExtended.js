import React from 'react';
import { connect } from 'react-redux';
import answerExtended from '../components/answerExtended';
import '../css/questionExtended.css';

@connect((store) => {
	return {
		answers: store.answers,
	};
})
export default class QuestionExtended extends React.Component {
	

	render() {

		//TODO
		//RECEIVE INFO AND PUT INTO DIVS

		//GET ANSWERS ONLY FOR PARTICULAR QUESTION ID

		//I DON'T KNOW STRUCTURE OF EACH ANSWER OBJECT YET
		//FOR NOW I PASS WHOLE OBJECT TO ANSWER_EXTENDED COMPONENT
		let answers = this.props.answers.map((answer) => { <answerExtended answer={answer}/> });

		return (
			<div>
				<div class="question-extended-header"> Is this a good idea? </div>
				<div class="question-extended-body"> I have an issue and can you help me </div>
				<div class="question-extended-time"> Monday 5.30 </div>
				<div class="answers">
					{answers}
				</div>
			</div>
		);
	}
}
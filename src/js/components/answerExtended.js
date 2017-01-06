import React from 'react';
import from '../css/answerExtended.css';

export default class AnswerExtended extends React.Component {
	render() {

		return (
			<div class="answer-extended">
				<div class="answer">Uniquora is a great helping service</div>
				<div class="answer-time">Written Monday 16.30</div>
				<div class="answer-author">
					<img class="author-image"/>
					<p class="author-name">Tauka Kunzhol</p>
				</div>
			</div>


		);
	}
}
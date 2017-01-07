import React from 'react';
import '../css/questionFeed.css';

export default class QuestionFeed extends React.Component {
	render() {

		//array of tags
		let tags;

		return (
			<div class="question-feed">
				<div class="question-feed-header">{this.props.question}</div>
				<div class="question-feed-time">Written Monday 16.30</div>
				<div class="question-feed-author">
					<img class="author-image"/>
					<p class="author-name">Tauka Kunzhol</p>
				</div>
				<div class="quetsion-feed-snippet"></div>
				{tags}
			</div>


		);
	}
}
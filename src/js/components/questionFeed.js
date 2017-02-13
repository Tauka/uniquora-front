import React from 'react';
import { hashHistory } from 'react-router';
import '../css/questionFeed.scss';

export default class QuestionFeed extends React.Component {

	render() {

		//array of tags
		const { question } = this.props;
		console.log("QUESTION FEED RENDER!");

		

		return (
			<div class="card question-feed" onClick={ this.props.onClick }>
				<div class="card-header d-flex flex-row align-items-center justify-content-end">
					<div class="question-title mr-auto">{ question.title }</div>
					<div class="badge badge-pill badge-info">{ question.courseDto.COURSETITLE }</div>
				</div>
			  <div class="card-block">
			  	<div class="best-answer">
			  		<div class="user d-flex flex-row">
			  			<img class="user-image d-inline-block" src="http://bit.ly/2jPuuGT" />
			  			<div class="user-info-answer wider-user-info d-inline-block ml-2">
			  				<div class="user-name">{ question.creator.name }</div>
			  				<div class="user-details">SST, CS 2nd year</div>
			  			</div>
			  			<i class="fa fa-check fa-lg d-inline-block align-self-center green-best"/>
			  		</div>
			  	</div>
			    <p class="card-text mt-4">C indeed offers better perfomance, however C# is much more convenient to use. C# has much more advance structure, as well as offering modern…</p>
			  </div>
			</div>


		);
	}
}
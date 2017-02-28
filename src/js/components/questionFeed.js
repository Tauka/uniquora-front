import React from 'react';
import { hashHistory } from 'react-router';
import '../css/questionFeed.scss';
import ReactHtmlParser from 'react-html-parser';

export default class QuestionFeed extends React.Component {

	render() {

		//array of tags
		const { question } = this.props;
		const { latestAnswer } = question;


		let bestAnswer = latestAnswer != undefined ?
				<div class="card-block">
					<div class="best-answer-header fancy"><span>latest answer</span></div>
					<div class="best-answer mt-4">
				  		<div class="user d-flex flex-row">
				  			<img class="user-image d-inline-block" src={`http://${API_ROOT}/api/avatar/${latestAnswer.creator.id}`} style={{borderRadius: "0"}} />
				  			<div class="user-info-answer wider-user-info d-inline-block ml-2">
				  				<div class="user-name">{ latestAnswer.creator.name }</div>
				  				<div class="user-details">{latestAnswer.creator.school}</div>
				  			</div>
				  			{/*<i class="fa fa-check fa-lg d-inline-block align-self-center green-best"/>*/}
				  		</div>
				  	</div>
				    <p class="card-text mt-4">{ ReactHtmlParser(latestAnswer.text) }</p>
				</div>
			    :
			    <div class="card-block">
		        	<p class="card-text mt-4" style={{color: "#ced4da", textAlign: "center"}}>No answers yet</p>
		        </div>



		return (
			<div class="card question-feed" onClick={ this.props.onClick }>
				<div class="card-header d-flex flex-row align-items-center justify-content-end">
					<div class="question-title mr-auto">{ question.title }</div>
					<div class="badge badge-pill badge-info" data-toggle="tooltip" data-placement="top" title={`${question.course.COURSETITLE}`}>{ question.course.COURSECODE }</div>
				</div>
			  	{ bestAnswer }
			</div>


		);
	}
}
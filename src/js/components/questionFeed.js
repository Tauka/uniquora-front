import React from 'react';
import { hashHistory } from 'react-router';
import '../css/questionFeed.scss';
import marked from 'marked';

marked.setOptions({
  sanitize: true,
  gfm: true
});

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
				  				<div class="user-details">{latestAnswer.creator.school}, {latestAnswer.creator.year}</div>
				  			</div>
				  			{/*<i class="fa fa-check fa-lg d-inline-block align-self-center green-best"/>*/}
				  		</div>
				  	</div>
				    <p class="card-text mt-4" dangerouslySetInnerHTML={{ __html: marked(latestAnswer.text) }} />
				</div>
			    :
			    <div class="card-block">
		        	<p class="card-text mt-4" style={{color: "#ced4da", textAlign: "center"}}>No answers yet</p>
		        </div>



		return (
			<div class="card question-feed">
				<div class="card-header d-flex flex-row align-items-center justify-content-end">
					<div class="question-title mr-auto" onClick={ this.props.onClick }>{ question.title }</div>
					<div class="badge badge-pill badge-info" data-toggle="tooltip" data-placement="top" title={`${question.course.COURSETITLE}`}>{ question.course.COURSECODE }</div>
					<div class="btn-group dropup ml-3">
					  <button type="button" class="btn menu-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-v fa-lg" aria-hidden="true"></i></button>
					  <div class="dropdown-menu">
					  	<button class="dropdown-item question-feed-menu-delete d-flex flex-row justify-content-between align-items-center">Edit <i class="fa fa-pencil" aria-hidden="true"></i></button>
					  	<button class="dropdown-item item-danger question-feed-menu-delete d-flex flex-row justify-content-between align-items-center" style={{color: "#d9534f"}}>Delete <i class="fa fa-trash" aria-hidden="true"></i></button>
					  </div>
					</div>
				</div>
			  	{ bestAnswer }
			</div>


		);
	}
}
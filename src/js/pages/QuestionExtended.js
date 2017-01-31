import React from 'react';
import { connect } from 'react-redux';
import AnswerExtended from '../components/answerExtended';
import { fetchAnswers, addAnswer } from '../actions/answerActions';
import { getQuestion } from '../actions/questionActions';
import '../css/questionExtended.scss';

@connect((store) => {
	return {
		answers: store.answers,
		questionExtended: store.questions.extendedQuestion,
		pending: store.questions.questionGetPending,
		success: store.questions.questionGetSuccess,
		error: store.questions.questionsGetError
	};
})
export default class QuestionExtended extends React.Component {
	
	componentWillMount() {
		this.props.dispatch(getQuestion(this.props.router.params.questionId));
	}

	addAnswer() {
		this.props.dispatch(addAnswer({
			text: $("#add-answer").val(),
			questionId: this.props.router.params.questionId
		}));

		this.props.dispatch(getQuestion(this.props.router.params.questionId));
	}

	mainRender() {
		
		return 
	}

	loadingRender() {
		return 
	}

	errorRender(err) {
		console.log("ERROR RENDER!");
		
	}

	trueRender() {
		if (this.props.pending && !this.props.success) {
			//LOADING
			return <div> LOADING </div>
		} else if (!this.props.pending && this.props.success) {
			let answers;
			if (this.props.questionExtended.answerList != undefined) {
				answers = this.props.questionExtended.answerList.map((answer) => { return <AnswerExtended answer={answer}/> });
			}

			//MAIN
			return <div class="question-extended-wrapper">
				<div class="question-extended-left-content">
					<div class="d-flex flex-row justify-content-center">
						<button class="btn btn-outline-primary" data-toggle="modal" data-target="#answerModal">ANSWER</button>
					</div>
					<div class="card trending-card mt-5 ml-auto mr-auto">
						<div class="card-header">
							Related questions
						</div>
					  	<div class="list-group">
					  	  <a class="list-group-item list-group-item-action">
					  	  	Cras justo odio 
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div> 
					  	  </a>
					  	  <a class="list-group-item list-group-item-action">
					  	  	Dapibus ac facilisis in
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div>
					  	  </a>
					  	  <a class="list-group-item list-group-item-action">
					  	  	Morbi leo risus
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div>
					  	  </a>
					  	  <a class="list-group-item list-group-item-action">
					  	  	Porta ac consectetur a
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div>
					  	  </a>
					  	  <a class="list-group-item list-group-item-action">
					  	  	Vestibulum at eros
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div>
					  	  </a>
					  	</div>
					</div>
				</div>
				<div class="card question-extended-question mr-auto ml-auto">
					<div class="card-header d-flex flex-row align-items-center justify-content-end">
						<div class="question-title mr-auto">{ this.props.questionExtended.title }</div>
						<div class="datetime d-flex flex-row align-items-center">
							<i class="fa fa-clock-o mr-2"/>
							<div class="time mr-2">15:36</div>
							<i class="fa fa-calendar-o mr-2"/>
							<div class="date mr-2">22.10.2016</div>
						</div>
						<div class="badge badge-pill badge-info d-inline">CSCI151</div>
					</div>
				  <div class="card-block">
				    <p class="card-text">{ this.props.questionExtended.text }</p>
				      <div class="tags">
				      	<span class="badge badge-pill badge-default mr-2">programming</span>
				      	<span class="badge badge-pill badge-default mr-2">unity</span>
				      	<span class="badge badge-pill badge-default mr-2">c#</span>
				      	<span class="badge badge-pill badge-default mr-2">literature</span>
				      </div>
				    </div>
				  </div>
				  { answers }

				{/*MODAL WINDOW*/}
				<div class="modal fade" id="answerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Add new answer</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				      	<div class="form-group">
				      		<textarea id="add-answer" class="form-control mt-2" rows="5" type="text" placeholder="Your answer" style={{resize: "none"}}/>
				      	</div>
				      </div>
				      <div class="modal-footer">
				        <button type="button" data-dismiss="modal" onClick={this.addAnswer.bind(this)} class="btn btn-primary">Answer</button>
				      </div>
				    </div>
				  </div>
				</div>		
			</div>
		} else {
			//ERROR
			return <div> ERROR </div>
		}
	}

	render() {

		console.log(this.props.pending);

		return (
			this.trueRender()
		);
	}
}
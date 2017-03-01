import React from 'react';
import { connect } from 'react-redux';
import AnswerExtended from '../components/answerExtended';
import { fetchAnswers, addAnswer } from '../actions/answerActions';
import { getQuestion } from '../actions/questionActions';
import '../css/questionExtended.scss';
import marked from 'marked';

marked.setOptions({
  sanitize: true
});

// marked.setOptions({
//   sanitize: true,
// });

// let unlisten = null;

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
	constructor(props) {
		super(props);
		this.addAnswer = this.addAnswer.bind(this);
		this.state = {
			modalListener: false,
			answerInput: ""
		}
	}
	
	componentWillMount() {
		this.props.dispatch(getQuestion(this.props.router.params.questionId));
		//detect refresh

		//detect url change
		// unlisten = this.props.router.listen((location) => {
 		// 	if (this.props.router.params.questionId != undefined) {
 		// 		this.props.dispatch(getQuestion(this.props.router.params.questionId));
 		// 	}
 		// });
 	}

 	componentDidMount() {

 	}

 	componentWillReceiveProps(newProps) {
 		if (newProps.params.questionId !== this.props.params.questionId) {
			this.props.dispatch(getQuestion(this.props.router.params.questionId));
 		}
 	}

 	componentDidUpdate() {
 		// if ($('#answer-form-group')[0] != undefined && !this.state.modalListener) {
 		// 	// $('#answerModal').on('hide.bs.modal', function (e) {
 		// 	// 	//undanger them
 		// 	// 	$("#answer-form-group").removeClass("has-danger");

 		// 	// 	//empty them
 		// 	// 	$("#add-answer").val("");

 		// 	// });

 		// 	//removing danger at focus
 		// 	$('#add-answer').on('focus', function(e) {
 		// 		$("#answer-form-group").removeClass("has-danger");
 		// 	});

 		// 	this.setState({
 		// 		modalListener: true
 		// 	});
 		// }
 		//init tooltips
 		$('[data-toggle="tooltip"]').tooltip()

 	}
 	componentWillUnmount() {
 		// if (unlisten != null) {
 		// 	unlisten();
 		// }
 	}

	addAnswer() {
		if (this.state.answerInput == "") {
			$("#answer-form-group").addClass("has-danger");
			return;
		}


		this.props.dispatch(addAnswer({
			text: this.state.answerInput,
			questionId: this.props.router.params.questionId
		}));

		this.setState({
			answerInput: ""
		});

		// $("#answerModal").modal('hide');
	}

	trueRender() {

		if (this.props.pending && !this.props.success) {
			//LOADING
			return <div class="loading d-flex justify-content-center align-items-center">
						<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
					</div>;
		} else if (!this.props.pending && this.props.success) {
			let answers;
			if (this.props.answers.answers != null) {

				let answersArray = [];
				let answersObject = this.props.answers.answers;

				Object.keys(answersObject).forEach(key => {
				    answersArray.push(answersObject[key]);
				});

				answers = answersArray.map((answer) => { return <AnswerExtended answer={answer}/> });
			}

			//calculating date
			let date = new Date(this.props.questionExtended.createdDate);
			let hours = date.getHours();
			if (hours < 10) {
				hours = "0" + hours.toString();
			}
			let minutes = date.getMinutes();
			if (minutes < 10) {
				minutes = "0" + minutes.toString();
			}
			let day = date.getDate();
			if (day < 10) {
				day = "0" + day.toString();
			}
			let month = date.getMonth();
			if (month < 10) {
				month = "0" + month.toString();
			}
			let year = date.getFullYear();
			if (year < 10) {
				year = "0" + year.toString();
			}

			//MAIN
			return <div class="question-extended-wrapper">
				{/*<div class="question-extended-left-content">

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
				</div>*/}
				<div class="card question-extended-question">
					<div class="card-header d-flex flex-row align-items-center justify-content-end">
						<div class="question-title mr-auto">{ this.props.questionExtended.title }</div>
						<div class="datetime d-flex flex-row align-items-center">
							<i class="fa fa-clock-o mr-2"/>
							<div class="time mr-2">{hours}:{minutes}</div>
							<i class="fa fa-calendar-o mr-2"/>
							<div class="date mr-2">{day}.{month}.{year}</div>
						</div>
						<div class="badge badge-pill badge-info d-inline" data-toggle="tooltip" data-placement="top" title={`${this.props.questionExtended.course.COURSETITLE}`}>{this.props.questionExtended.course.COURSECODE}</div>
					</div>
				  <div class="card-block">
				    <p class="card-text" dangerouslySetInnerHTML={{ __html: marked(this.props.questionExtended.text) }} />
				      {/*<div class="tags">
				      	<span class="badge badge-pill badge-default mr-2">programming</span>
				      	<span class="badge badge-pill badge-default mr-2">unity</span>
				      	<span class="badge badge-pill badge-default mr-2">c#</span>
				      	<span class="badge badge-pill badge-default mr-2">literature</span>
				      </div>*/}
				    </div>
				  </div>
				  { answers }
				  <div id="answer-form-group" class="form-group question-extended-answer-input mt-4">
				      <label for="exampleTextarea"><b>Your answer</b></label>
				      <textarea id="add-answer" class="form-control" id="exampleTextarea" rows="3" value={this.state.answerInput} onChange={(e) => {this.setState({answerInput: e.target.value})}} onFocus={() => {$("#answer-form-group").removeClass("has-danger")}}></textarea>
				      <button class="btn btn-primary mt-2 mr-auto" onClick={this.addAnswer}> Add answer </button>
			    	</div>


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
				      	<div id="answer-form-group" class="form-group">
				      		<textarea id="add-answer" class="form-control mt-2" rows="5" type="text" placeholder="Your answer" style={{resize: "none"}}/>
				      	</div>
				      </div>
				      <div class="modal-footer">
				        <button type="button" onClick={this.addAnswer.bind(this)} class="btn btn-primary">Answer</button>
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

		// console.log(this.props.pending);

		return (
			this.trueRender()
		);
	}
}
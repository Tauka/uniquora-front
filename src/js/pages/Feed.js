import React from 'react';
import QuestionFeed from '../components/questionFeed';
import AutoComplete from '../components/autoComplete';
import { connect } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { addQuestion, fetchQuestions } from "../actions/questionActions";
import '../css/feed.scss';

@connect((store) => {
	return {
		questions: store.questions,
		isAuth: store.users.isAuth
	};
})
export default class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.goToFeed = this.goToFeed.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onRootClick = this.onRootClick.bind(this);

		this.state = {
		      typedValue: null,
		      dropdownRender: true
		};
	}

	componentWillMount() {
		this.props.dispatch(fetchQuestions());
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.isAuth) {
			this.props.router.push('/auth');
		}
	}

	addQuestion() {
		console.log($("#question-details-input").val());
		this.props.dispatch(addQuestion({
			title: $("#question-title-input").val(),
			text: $("#question-details-input").val(),
			courseId: "1",
			isAnonymous: false
		}));
	}

	goToQuestionForm(questionId) {
		this.props.router.push(`/question/${questionId}`);
	}


	onRootClick() {
		this.setState({
			dropdownRender: false
		})
	}


	handleChange(event) {
		this.setState({
			dropdownRender: true, 
			typedValue: event.target.value
		}); 
	}

	goToFeed() {
		if (this.props.router.location.pathname != "/") {
			this.props.router.push('/');
		}
	}

	logout() {
		this.props.dispatch(logoutUser());
	}

	//allows conditional rendering
	// fuckingRendering(props, questions) {
	// 	if (props.questions.questionsFetchPending) {
	// 		return <div>LOADING</div>;
	// 	} else if (props.questions.questionsFetchSuccess) {
			 
	// 		return 	<div class="feed-root">
	// 					<nav class="navbar fixed-top navbar-light flex-row bg-faded justify-content-between">
	// 					  	<a class="navbar-brand" onClick={this.goToFeed}><b>UNIQUORA</b></a>
	// 					    <form class="form-inline" style={{flexBasis: "50%"}}>
	// 					      <input class="form-control" type="text" placeholder="Search" style={{flexGrow: 1}}/>
	// 					    </form>
	// 					    <button class="btn btn-outline-warning" onClick={this.logout}>LOGOUT</button>
	// 					</nav>
	// 				{ React.cloneElement(this.props.children, { questions: this.props.questions.questions })}				

	// 				</div>



	// 	} else {
	// 		return props.questions.error != null ? <div> { this.props.questions.error.toString() }</div> : null;
	// 	}
	// }

	autoComplete(suggestions) {
		if (this.state.typedValue != "" && this.state.typedValue != null && this.state.dropdownRender) {
			return <AutoComplete typedValue={this.state.typedValue} onclick={(id) => { this.goToQuestionForm(id) } } suggestions={suggestions} addQuestion={true} style={{width: "49%", top: "2.8rem"}}/>
		} 
	}

	render() {
		let questions = this.props.questions.questions.map((questionItem) => { return <QuestionFeed question={ questionItem } />});;
		let suggestions = this.props.questions.questions.map((questionItem) => { return { title: questionItem.title, id: questionItem.id } });
		console.log(this.props.questions);
		return (
			 	<div class="feed-root" onClick={this.onRootClick}>
					<nav class="navbar fixed-top navbar-light flex-row bg-faded justify-content-between">
					  	<a class="navbar-brand" onClick={this.goToFeed}><b>UNIQUORA</b></a>
					    <form class="form-inline" style={{flexBasis: "50%"}}>
					      <input class="navbar-input form-control" type="text" placeholder="Search" onChange={this.handleChange} style={{width: "100%"}}/>
					      { this.autoComplete(suggestions) }
					    </form>
					    <button class="btn btn-outline-warning" onClick={this.logout}>LOGOUT</button>
					</nav>

				{ React.cloneElement(this.props.children, { questions: this.props.questions.questions})}


				<div class="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Add new question</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				      	<div class="form-group">
				      		<input id="question-title-input" class="form-control" type="text" placeholder="Your question"/>
				      		<textarea id="question-details-input"class="form-control mt-2" rows="3" type="text" placeholder="Detailed question" style={{resize: "none"}}/>
				      	</div>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.addQuestion}>Ask</button>
				      </div>
				    </div>
				  </div>
				</div>			

				</div>	
			// this.fuckingRendering(this.props, questions)
		);
	}
}
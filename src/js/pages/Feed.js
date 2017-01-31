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
		this.searchHandleChange = this.searchHandleChange.bind(this);
		this.courseHandleChange = this.courseHandleChange.bind(this);
		this.onRootClick = this.onRootClick.bind(this);

		this.state = {
		      searchTypedValue: null,
		      searchDropdownRender: true,
		      courseDropdownRender: true,
		      courseValue: null,
		      courseValueToRequest: null,
		      tempCourses: [
		      	"Intro to C Programming",
		      	"Microcontrollers with Lab",
		      	"Intro to Comic Book",
		      	"Database Systems",
		      	"Operating Systems",
		      	"Computer Networks"
		      ]
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
			courseId: this.state.courseValueToRequest,
			isAnonymous: false
		}));
	}

	goToQuestionForm(questionId) {
		this.props.router.push(`/question/${questionId}`);
	}


	onRootClick() {
		this.setState({
			searchDropdownRender: false,
			courseDropdownRender: false

		})
	}


	searchHandleChange(event) {
		this.setState({
			searchDropdownRender: true, 
			searchTypedValue: event.target.value
		}); 
	}

	courseHandleChange(event) {
		this.setState({
			courseDropdownRender: true,
			courseValue: event.target.value
		})
	}

	onCourseModalClick(id, name) {
		this.setState({ courseValueToRequest: id});
		$("#question-course-title").val(name);

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

	autoComplete(suggestions, typedValue, dropdownRender, onclickFunc, style, questionButton) {
		if (typedValue != "" && typedValue != null && dropdownRender) {
			return <AutoComplete typedValue={typedValue} onclick={ onclickFunc } suggestions={suggestions} addQuestion={questionButton} style={style}/>
		} 
	}

	render() {
		let questions = this.props.questions.questions.map((questionItem) => { return <QuestionFeed question={ questionItem } />});;
		let suggestions = this.props.questions.questions.map((questionItem) => { return { title: questionItem.title, id: questionItem.id } });
		let courses =  this.state.tempCourses.map((course) => { return { title: course, id: 1 } });
		return (
			 	<div class="feed-root" onClick={this.onRootClick}>
					<nav class="navbar fixed-top navbar-light flex-row bg-faded justify-content-between">
					  	<a class="navbar-brand" onClick={this.goToFeed}><b>UNIQUORA</b></a>
					    <form class="form-inline" style={{flexBasis: "50%"}}>
					      <input class="navbar-input form-control" type="text" placeholder="Search" onChange={this.searchHandleChange} style={{width: "100%"}}/>
					      { this.autoComplete(suggestions, this.state.searchTypedValue, this.state.searchDropdownRender, (id) => { this.goToQuestionForm(id) }, {width: "49%", top: "2.8rem"}, true) }
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
				      		<input id="question-course-title" class="form-control mt-2" type="text" onChange={this.courseHandleChange} placeholder="Enter course title"/>
				      		{ this.autoComplete(courses, this.state.courseValue, this.state.courseDropdownRender, (id, name) => { this.onCourseModalClick(id, name) }, {width: "92%", top: "10.3rem"}, false) }
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
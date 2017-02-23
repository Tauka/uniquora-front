import React from 'react';
import QuestionFeed from '../components/questionFeed';
import AutoComplete from '../components/autoComplete';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as userActions from "../actions/userActions";
import * as questionActions from "../actions/questionActions";
import '../css/feed.scss';

@connect((store) => {
			return {
				questions: store.questions,
				users: store.users
			};
		},
		(dispatch) => {
			return {
				questionActions: bindActionCreators(questionActions, dispatch),
				userActions: bindActionCreators(userActions, dispatch)
			}
		}
)
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
		      searchTypedValue: "",
		      searchDropdownRender: true,
		      courseDropdownRender: true,
		      courseValue: "",
		      courseValueToRequest: null,
		      modalListener: false,
		      searchInputListener: false	

		};
	}

	componentWillMount() {
		this.props.userActions.getUserInfo();
		this.props.questionActions.fetchCourses();
		this.props.questionActions.fetchQuestions(1);

		//adding cool shadow effect on header
		$(window).scroll(function() {     
		    var scroll = $(window).scrollTop();
		    if (scroll > 0) {
		        $("#header").addClass("active");
		    }
		    else {
		        $("#header").removeClass("active");
		    }
		});
	}

	componentDidMount() {
	}

	componentWillUnmount() {
		$(window).off("scroll");
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.users.isAuth) {
			this.props.router.push('/auth');
		}
	}

	componentDidUpdate() {
		//modal reset when it's closed
		if ($('#question-add-modal')[0] != undefined && !this.state.modalListener) {
			$('#question-add-modal').on('hide.bs.modal', function (e) {
				//undanger them
				$("#question-form-group-title").removeClass("has-danger");
				$("#question-form-group-course").removeClass("has-danger");
				$("#question-form-group-text").removeClass("has-danger");

				//empty them
				$("#question-title-input").val("");

				this.setState({
					courseValue: ""
				});

				$("#question-details-input").val("");

				//clear search bar
				this.setState({
					searchTypedValue: ""
				});

			}.bind(this));

			//removing danger at focus
			$('#question-title-input').on('focus', function(e) {
				$("#question-form-group-title").removeClass("has-danger");
			});

			$('#question-course-input').on('focus', function(e) {
				$("#question-form-group-course").removeClass("has-danger");
			});

			$('#question-details-input').on('focus', function(e) {
				$("#question-form-group-text").removeClass("has-danger");
			});

			this.setState({
				modalListener: true
			});
		}

		if ($('#search-input-form')[0] != undefined && !this.state.searchInputListener) {
			$('#search-input-field').focus(() => {
				$('#search-input-form').animate({
					flexBasis: "50%"
				}, 200);
			});

			$('#search-input-field').blur(() => {
				$('#search-input-form').animate({
					flexBasis: "30%"
				}, 200);
			});

			$('#search-input-field').keypress((e) => {
				if (e.keyCode == 13) {
					$("#question-add-modal").modal('show');
					$("#question-title-input").val(this.state.searchTypedValue);
				}
			});
			

			this.setState({
				searchInputListener: true
			});
		}
	}

	addQuestion() {

		let danger = false;
		//check if anything is empty
		if ($("#question-title-input").val() == "") {
			$("#question-form-group-title").addClass("has-danger");
			danger = true;
		}

		if ($("#question-course-input").val() == "" || this.state.courseValueToRequest == null) {
			$("#question-form-group-course").addClass("has-danger");
			danger = true;
		}

		if ($("#question-details-input").val() == "") {
			$("#question-form-group-text").addClass("has-danger");
			danger = true;
		}

		//prevent further execution if it is dangerous
		if (danger) {
			return;
		}




		this.props.questionActions.addQuestion({
			title: $("#question-title-input").val(),
			text: $("#question-details-input").val(),
			courseId: this.state.courseValueToRequest,
			isAnonymous: false
		});

		$("#question-add-modal").modal('hide');
		
	}

	closeAddQuestionModal() {

	}

	goToQuestionForm(questionId) {
		console.log(this.props.router);
		this.props.router.push(`question/${questionId}`);

		//clear search bar
		this.setState({
			searchTypedValue: ""
		});
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
			courseValue: event.target.value,
			courseValueToRequest: null
		})
	}

	onCourseModalClick(id, name) {
		this.setState({ courseValueToRequest: id});
		this.setState({
			courseValue: name
		});

	}

	goToFeed() {
		if (this.props.router.location.pathname != "/") {
			this.props.router.push('/');
		}


	}

	logout() {
		this.props.userActions.logoutUser();
	}

	autoComplete(suggestions, typedValue, dropdownRender, onclickFunc, style, specialFunction) {
		if (typedValue != "" && typedValue != null && dropdownRender) {
			return <AutoComplete typedValue={typedValue} onclick={ onclickFunc } suggestions={suggestions} specFunc={specialFunction} style={style}/>
		} 
	}

	render() {

		let render = null;
		if (this.props.questions.questionsFetchInitialPending) {
			render = <div class="loading d-flex justify-content-center align-items-center">
							<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
			 			</div>;
		} else if (this.props.questions.questionsFetchSuccess) {
			let questions = this.props.questions.questions.map((questionItem) => { return <QuestionFeed key={questionItem.id} question={ questionItem } />});;
			let suggestions = this.props.questions.questions.map((questionItem) => { return { title: questionItem.title, id: questionItem.id } });
			let courses =  this.props.questions.courses.map((course) => { return { title: course.COURSETITLE, id: course.id } });
			 			 
			render = <div class="feed-root" onClick={this.onRootClick} >
							<nav id="header" class="navbar fixed-top navbar-light flex-row bg-faded justify-content-center">
								<div class="navbar-wrapper d-flex flex-row justify-content-between">
								  	<a class="navbar-brand" onClick={this.goToFeed}><b>UNIQUORA</b></a>
								    <form id="search-input-form" class="form-inline" style={{flexBasis: "30%"}}>
								      <input id="search-input-field" class="navbar-input form-control" value={this.state.searchTypedValue} type="text" placeholder="Ask or search" onChange={this.searchHandleChange} style={{width: "100%"}}/>
								      { this.autoComplete(suggestions, this.state.searchTypedValue, this.state.searchDropdownRender, (id) => { this.goToQuestionForm(id) }, {width: "44%", top: "2.8rem"}, () => {
								      		$("#question-add-modal").modal('show');
								      		$("#question-title-input").val(this.state.searchTypedValue);
								      }) }
								    </form>
								    <button class="btn btn-outline-warning" onClick={this.logout}>LOGOUT</button>
							    </div>
							</nav>
							{ React.cloneElement(this.props.children, { questions: this.props.questions.questions, fetchQuestions: this.props.questionActions.fetchQuestions, loadedPage: this.props.questions.loadedPage, questionsEmpty: this.props.questions.questionsEmpty, user: this.props.users.authorizedUser, courses: this.props.questions.courses})}
							<div class="modal fade" id="question-add-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							  <div class="modal-dialog" role="document">
							    <div class="modal-content">
							      <div class="modal-header">
							        <h5 class="modal-title" id="exampleModalLabel">Add new question</h5>
							        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
							          <span aria-hidden="true">&times;</span>
							        </button>
							      </div>
							      <div class="modal-body">
							      	<div id="question-form-group-title" class="form-group">
							      		<input id="question-title-input" tabindex="1" class="form-control" autocomplete="off" type="text" placeholder="Your question"/>
							      	</div>
							      	<div id="question-form-group-course" class="form-group">
							      		<input id="question-course-input" class="form-control mt-2" value={this.state.courseValue} type="text" autocomplete="off" onChange={this.courseHandleChange} placeholder="Enter course title"/>
							      		{ this.autoComplete(courses, this.state.courseValue, this.state.courseDropdownRender, (id, name) => { this.onCourseModalClick(id, name) }, {width: "92%", top: "10.3rem"}, null) }
							      	</div>
							      	<div id="question-form-group-text" class="form-group">
							      		<textarea id="question-details-input"class="form-control mt-2" rows="3" type="text" placeholder="Detailed question" style={{resize: "none"}}/>
							      	</div>
							      </div>
							      <div class="modal-footer">
							        <button type="button" class="btn btn-primary" onClick={this.addQuestion}>Ask</button>
							      </div>
							    </div>
							  </div>
							</div>			
						</div>;
		}
		else {
			render = this.props.questions.error != null ? <div> { this.props.questions.error.toString() }</div> : null;
		}
		
		return ( 	
			render
		);
	}
}
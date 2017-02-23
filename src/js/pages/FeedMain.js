import React from 'react';
import ReactDOM from 'react-dom'
import QuestionFeed from '../components/questionFeed';
import AutoComplete from "../components/autoComplete";
import '../css/feedMain.scss'

export default class FeedMain extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.onRootClick = this.onRootClick.bind(this);
		this.goToUp = this.goToUp.bind(this);
		this.removeTag = this.removeTag.bind(this);
		this.state = {
			typedValue: "",
			suggestions: [
				"somehting"
			],
			dropdownRender: true,
			tags: [
			],
			atBottom: false,
			prevScroll: 0

		}
	}

	componentWillMount() {
		
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		$('[data-toggle="tooltip"]').tooltip();
	}

	componentWillReceiveProps(nextProps) {
	}

	componentDidUpdate() {
		//for lazy loaded ones
		$('[data-toggle="tooltip"]').tooltip();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleChange(event) {
		this.setState({
			typedValue: event.target.value,
			dropdownRender: true
		});
	}

	handleScroll(event) {
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
	    const body = document.body;
	    const html = document.documentElement;
	    const yOffset = 400;
	    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
	    const windowBottom = windowHeight + window.pageYOffset;

	    if (windowBottom >= docHeight && !this.state.atBottom) {
	    	this.setState({
	    		atBottom: true
	    	})

	    	//fetch new questions
	    	if (!this.props.questionsEmpty) {
	    		this.props.fetchQuestions(this.props.loadedPage + 1);
	    	}

	    } else if ((docHeight - windowBottom >= yOffset && this.state.atBottom)) {
	    	this.setState({
	    		atBottom: false
	    	})
	    }
		    
	}

	goToQuestionForm(questionId) {

		this.props.router.push(`/question/${questionId}`);
		$('[data-toggle="tooltip"]').tooltip('hide');
	}

	handleChildClick(i) {
		console.log(i);
	}

	goToUp() {
		this.setState({
			prevScroll: window.pageYOffset
		});

		const offset = 200;
		if (window.pageYOffset < offset) {
			window.scrollTo(0, this.state.prevScroll);
		} else {
			window.scrollTo(0, 0);
		}
		
	}

	onTagClick(id, name, code) {
		this.setState({
			typedValue: ""
		});

		let { tags } = this.state;

		for (let i = 0; i < tags.length; i++) {
			if (tags[i].id == id) {
				return;
			}
		}

		this.setState({
			tags: [...this.state.tags, { id: id, name: name, code: code}]
		});

		//stop rendering dropdown
		this.setState({
			dropdownRender: false
		});
	}

	removeTag(tag) {
		let tags = this.state.tags;

		tags.splice(tags.indexOf(tag), 1);

		this.setState({
			tags: tags
		});

		$('[data-toggle="tooltip"]').tooltip('hide');
	}

	onRootClick() {
		this.setState({
			dropdownRender: false
		});
	}



	Onclick() {

	}


	autoComplete(suggestions, typedValue, dropdownRender, onclickFunc, style, questionButton) {
		if (typedValue != "" && typedValue != null && dropdownRender) {
			return <AutoComplete typedValue={typedValue} onclick={ onclickFunc } suggestions={suggestions} addQuestion={questionButton} style={style}/>
		} 
	}

	render() {
		const { questions } = this.props;

		//sorting from latest to oldest
		let questionsSorted = questions.sort((q1, q2) => {
			if (q1.createdDate > q2.createdDate) {
				return -1;
			} else {
				return 1;
			}
		});

		//filtering
		let { tags } = this.state;
		let questionsFiltered;   
		if (tags.length > 0) {
			questionsFiltered = questionsSorted.filter((question) => {
				for (let i = 0; i < tags.length; i++) {
					if (tags[i].id == question.course.id) {
						return true;
					}
				}

				return false;
			});
		} else {
			questionsFiltered = questionsSorted;
		}

		

		//rendering
		let questionsRender = questionsFiltered.map((question) => {
			return <QuestionFeed question={question} key={question.id} onClick={() => { this.goToQuestionForm(question.id) }}/>
		});

		let tagsRender = this.state.tags.map((tag) => {
			return <span class="badge badge-pill badge-primary mt-2" key={tag.id} data-toggle="tooltip" data-placement="top" title={`${tag.name}`} onClick={() => {this.removeTag(tag)}}>{ tag.code }</span>
		})

		//loading spinner for lazy load
		let questionLoading;

		if (this.state.atBottom) {
			questionLoading = <div class="question-bottom d-flex justify-content-center align-items-center" style={{height: "100px"}}>
									<div class="loading d-flex justify-content-center align-items-center">
										<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
									</div>
								</div>

			if (this.props.questionsEmpty) {
				questionLoading = <div class="question-bottom d-flex justify-content-center align-items-center" style={{height: "100px"}}>
										<div class="loading d-flex justify-content-center align-items-center">
											<div>THE END</div>
										</div>
									</div>
			}
		} else {
			questionLoading = null;
		}

		//courses for autoComplete
		let courses = this.props.courses.map((course) => { return { title: course.COURSETITLE, id: course.id, code: course.COURSECODE } });

		return (
			<div style={{flexBasis: "40%"}}>
				
				<div class="left-content" onClick={this.onRootClick}>
					<div class="up-area d-flex justify-content-center align-items-center" onClick={this.goToUp}>
						<div id="up"><b>UP</b></div>
					</div>

					<div class="filter" style={{flexBasis: "50%"}}>
						<div class="filter-title"> Filters </div>
						<div class="form-group mr-auto ml-auto">
				    		<input type="text" class="form-control" value={this.state.typedValue} autocomplete="off" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter course name or tag" onChange={this.handleChange}/>
				    		{ this.autoComplete(courses, this.state.typedValue, this.state.dropdownRender, (id, name, code) => { this.onTagClick(id, name, code)}, {width: "18%", top: "13rem"}, false) }
				  		</div>
				  		<div class="tags-field d-flex flex-column align-items-center">
				  			{ tagsRender }
				  		</div>
				  	</div>
				  	
				  	<div class="sort d-flex align-items-start justify-content-center" style={{flexBasis: "50%"}}>
				  		
				  		{/*<div class="filter-title"> Sort </div>
				  		<select class="sort-select form-control mr-auto ml-auto">
				  		  <option>Time</option>
				  		  <option>Alphabet</option>
				  		</select>*/}
				  	</div>
				</div>
				<div ref="questions" class="center-content d-flex flex-column align-items-center mr-auto ml-auto" onScroll={() => {console.log('scroll')}}>
					{ questionsRender }
					{ questionLoading }
				</div>
			</div>
		);
	}
}
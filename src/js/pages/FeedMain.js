import React from 'react';
import QuestionFeed from '../components/questionFeed';
import AutoComplete from "../components/autoComplete";
import '../css/feedMain.scss'

export default class FeedMain extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			typedValue: null,
			suggestions: [
			"somehting"
			],
			dropdownRender: true,
			tags: [
				"CSCI151"
			]
		}
	}

	componentDidMount() {
		// $("body").click(() => {
		// 	this.setState({
		// 		dropdownRender: false
		// 	})
		// });
	}

	handleChange(event) {
		this.setState({
			typedValue: event.target.value,
			dropdownRender: true
		});
	}

	goToQuestionForm(questionId) {
		this.props.router.push(`/question/${questionId}`);
	}

	handleChildClick(i) {
		console.log(i);
	}



	Onclick() {

	}


	autoComplete() {
		if (this.state.typedValue != "" && this.state.typedValue != null && this.state.dropdownRender) {
			return <AutoComplete typedValue={this.state.typedValue} suggestions={this.state.suggestions} style={{width: "21%"}} />
		} 
	}

	render() {
		const { questions } = this.props;

		let questionsRender = questions.map((question) => {
			return <QuestionFeed question={question} onClick={() => { this.goToQuestionForm(question.id) }}/>
		});

		let tagsRender = this.state.tags.map((tag) => {
			return <span class="badge badge-pill badge-primary">{ tag }</span>
		})

		return (
			<div>
				{/* <div class="left-content">
					<div class="filter">
						<div class="filter-title"> Filters </div>
						<div class="form-group mr-auto ml-auto">
				    		<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter course name or tag" onChange={this.handleChange}/>
				    		{ this.autoComplete() }
				  		</div>
				  		<div class="tags-field">

				  		</div>
				  	</div>
				  	<div class="sort">
				  		<div class="filter-title"> Sort </div>
				  		<select class="sort-select form-control mr-auto ml-auto">
				  		  <option>Time</option>
				  		  <option>Alphabet</option>
				  		</select>
				  	</div>
				</div> */ }
				<div class="center-content d-flex flex-column align-items-center mr-auto ml-auto">
					{ questionsRender }
				</div>
			</div>
		);
	}
}
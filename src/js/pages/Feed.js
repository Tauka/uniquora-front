import React from 'react';
import questionFeed from '../components/questionFeed';
import { connect } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { fetchQuestions } from "../actions/questionActions";
import '../css/feed.css';


@connect((store) => {
	return {
		questions: store.questions,
		isAuth: store.users.isAuth
	};
})
export default class Feed extends React.Component {
	
	componentWillMount() {
		this.props.dispatch(fetchQuestions);
	}

	componentWillUpdate() {
		if (!this.props.isAuth) {
			this.props.router.push('/');
		}
	}

	logout() {
		this.props.dispatch(logoutUser());
	}

	render() {
		//TODO
		//SET UP HOOKS FOR FETCHING QUESTIONS

		//SET UP INPUT FIELDS FOR ADDING QUESTION

		//ONCLICK EVENT FOR ROUTING TO EXTENDED QUESTION AND PASSING INFO TO IT

		//I DON'T KNOW STRUCTURE OF EACH QUESTION OBJECT YET
		//FOR NOW I PASS WHOLE OBJECT TO QUESTION_FEED COMPONENT
		let questions = this.props.questions.questions.map((question) => {<questionFeed question={question}/>});

		return (
			<div>
				<button onClick={this.logout.bind(this)}>LOGOUT</button>
				THIS IS FEED!
			</div>
		);
	}
}
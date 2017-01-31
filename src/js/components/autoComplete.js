import React from 'react';
import '../css/autoComplete.scss';

export default class AutoComplete extends React.Component {
	render() {


		console.log("IN AUTOCOMPLETE");
		//array of tags
		const suggestionsLength = 5;
		const { typedValue } = this.props;
		const suggestedValues = this.props.suggestions.filter((suggestion) => { return suggestion.title.toLowerCase().includes(typedValue.toLowerCase())}).slice(0, suggestionsLength);
		const renderItems = suggestedValues.map((suggestedValue) => {return <a class="list-group-item list-group-item-action" onClick={() => { this.props.onclick(suggestedValue.id, suggestedValue.title) } }>{suggestedValue.title}</a> });
		let addQuestion = this.props.addQuestion ? <a class="add-question list-group-item list-group-item-info list-group-item-action" data-toggle="modal" data-target="#myModal">ADD QUESTION</a> : null;

		return (
			<div class="autocomplete list-group" style={this.props.style}>
				{ renderItems }
				{ addQuestion }
			</div>
		);
	}
}
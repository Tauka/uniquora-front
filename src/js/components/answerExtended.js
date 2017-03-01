import React from 'react';
import '../css/answerExtended.scss';
import marked from 'marked';

marked.setOptions({
  sanitize: true
});

export default class AnswerExtended extends React.Component {
	render() {
		const { text, creator, createdDate } = this.props.answer;
		let date = new Date(createdDate);
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
		
		return (
				<div class="card question-extended-answer mt-2">
				  <div class="card-block">
					  <div class="user d-flex flex-row justify-content-start">
					  	<img class="user-image" src={`http://${API_ROOT}/api/avatar/${creator.id}`} style={{borderRadius: "0"}} />
					  	<div class="user-info-answer d-inline-block ml-2 wide-user-info">
					  		<div class="user-name">{ creator.name }</div>
					  		<div class="user-details">{ creator.school }, { creator.year }</div>
					  	</div>
					  	{/*<i class="fa fa-check fa-lg align-self-center green-best mr-auto"/>*/}
					  	<div class="datetime d-flex flex-row align-items-center ml-auto">
					  		<i class="fa fa-clock-o mr-2"/>
					  		<div class="time mr-2">{hours}:{minutes}</div>
					  		<i class="fa fa-calendar-o mr-2"/>
					  		<div class="date mr-2">{day}.{month}.{year}</div>
					  	</div>
					  </div>
					  
				    <p class="card-text mt-4" dangerouslySetInnerHTML={{ __html: marked(text) }} />
				    	{/*<div class="footer d-flex flex-row justify-content-between">
					    	<div class="question-extended-answer-upvotes">
					    		<i class="fa fa-arrow-up green"/>
					    		<div class="question-extended-answer-upvotes-count d-inline-block ml-2 mr-2">
					    			750
					    		</div>
					    		<i class="fa fa-arrow-down red"/>
					    	</div>
					    	<a class="comment"> COMMENT </a>
					  	</div>*/}
			  		</div>
				</div>


		);
	}
}
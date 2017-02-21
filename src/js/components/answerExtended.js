import React from 'react';
import '../css/answerExtended.scss';

export default class AnswerExtended extends React.Component {
	render() {
		console.log(this.props.answer);

		const { text, creator, createdDate } = this.props.answer;
		let date = new Date(createdDate);
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		
		return (
				<div class="card question-extended-answer mt-2 mr-auto ml-auto">
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
					  
				    <p class="card-text mt-4"> { text } </p>
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
import React from 'react';
import '../css/answerExtended.scss';
import marked from 'marked';

marked.setOptions({
  sanitize: true,
  gfm: true,
  breaks: true
});

export default class AnswerExtended extends React.Component {
	constructor(props) {		
		super(props);

		this.edit = this.edit.bind(this);
		this.saveEdit = this.saveEdit.bind(this);

		this.state = {
			edit: false,
			editInput: ""
		}
	}

	edit() {
		this.setState({
			edit: true
		});
	}

	handleEditInput = (e) => {
		this.setState({
			handleEditInput: e.target.value
		})
	}

	saveEdit() {
		$(".edit-answer-button").html("<i class='fa fa-refresh fa-spin fa-lg fa-fw'></i>");

		this.props.saveEditAction({
			text: this.state.handleEditInput,
			questionId: this.props.questionId,
			answerId: this.props.answer.id
		})
		.then(() => {
			$(".add-answer-button").html("Save");

			this.setState({
				edit: false
			});
		})

		
	}

	render() {
		const { text, creator, createdDate, modifiedDate } = this.props.answer;
		const { saveEditAction } = this.props;


		let date = new Date(createdDate);

		//calculating time passed since edit
		let displayTime = null;
		if (createdDate != modifiedDate) {

			let timePassedSinceEdit = Date.now() - modifiedDate;
			let passedDays = Math.floor(timePassedSinceEdit / (24 * 3600000));
			let passedHours = Math.floor(timePassedSinceEdit / 3600000);
			let passedMinutes = Math.floor(timePassedSinceEdit / 60000);
			let passedSeconds = Math.floor(timePassedSinceEdit / 1000);

			displayTime = passedSeconds + " seconds ago"

			if (passedMinutes >= 1) {
				displayTime = passedMinutes + " minutes ago"
			}

			if (passedHours >= 1) {
				displayTime = passedHours + " hours ago";
			}

			if (passedDays >= 1) {
				displayTime = passedDays + " days ago";
			}

		}
		//created date
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



		let edit = this.state.edit ?
		<div class="form-group mt-4 d-flex flex-column">
		    <textarea type="email" class="form-control" rows="4" id="exampleInputEmail1" onChange={this.handleEditInput} aria-describedby="emailHelp">{ text }</textarea>
		    <div class="d-flex flex-row justify-content-end align-items-center mt-2">
		    	<button type="button" class="btn btn-danger" style={{width: "20%"}} onClick={() => this.setState({edit: false})}>Cancel</button>
		    	<button type="button" class="btn btn-success ml-2 edit-answer-button" style={{width: "20%"}} onClick={this.saveEdit}>Save</button>
		    </div>
		</div>
		: 
		<p class="card-text mt-4" dangerouslySetInnerHTML={{ __html: marked(text) }} />;
		
		return (
				<div class="card question-extended-answer mt-2">
				  <div class="card-block">
					  <div class="user d-flex flex-row justify-content-start">
					  	<img class="user-image" src={`http://${API_ROOT}/api/avatar/${creator.id}`} style={{borderRadius: "0"}} />
					  	<div class="user-info-answer d-inline-block ml-2 wide-user-info" style={{flexBasis: "70%"}}>
					  		<div class="user-name-last-updated d-flex flew-row align-items-center">
					  			<div class="user-name">{ creator.name}</div>
					  			{displayTime != null && <small class="text-info last-updated ml-2" style={{fontStyle: "italic"}}>{"Updated " + displayTime}</small>}
					  		</div>
					  		<div class="user-details">{ creator.school }, { creator.year }</div>
					  	</div>
					  	{/*<i class="fa fa-check fa-lg align-self-center green-best mr-auto"/>*/}
					  	<div class="datetime d-flex flex-row align-items-center ml-auto" >
					  		<i class="fa fa-clock-o mr-2"/>
					  		<div class="time mr-2">{hours}:{minutes}</div>
					  		<i class="fa fa-calendar-o mr-2"/>
					  		<div class="date mr-2">{day}.{month}.{year}</div>
					  	</div>
					  	<div class="btn-group dropup ml-2">
					  	  <button type="button" class="btn menu-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-v fa-lg" aria-hidden="true"></i></button>
					  	  <div class="dropdown-menu">
					  	  	<button type="button" class="dropdown-item question-feed-menu-delete d-flex flex-row justify-content-between align-items-center" onClick={this.edit}>Edit <i class="fa fa-pencil" aria-hidden="true"></i></button>
					  	  	<button type="button" class="dropdown-item item-danger question-feed-menu-delete d-flex flex-row justify-content-between align-items-center" data-toggle="modal" data-target="#deleteModal" style={{color: "#d9534f"}}>Delete <i class="fa fa-trash" aria-hidden="true"></i></button>
					  	  </div>
					  	</div>
					  </div>
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
					{ edit }
			  		</div>
			  		<div class="modal fade" id="deleteModal">
			  		  <div class="modal-dialog" role="document">
			  		    <div class="modal-content">
			  		      <div class="modal-header">
			  		        <h5 class="modal-title">Delete answer</h5>
			  		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  		          <span aria-hidden="true">&times;</span>
			  		        </button>
			  		      </div>
			  		      <div class="modal-body">
			  		        <p>You sure you want to delete the answer?</p>
			  		      </div>
			  		      <div class="modal-footer">
			  		        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
			  		        <button type="button" class="btn btn-danger">Delete</button>
			  		      </div>
			  		    </div>
			  		  </div>
			  		</div>
				</div>


		);
	}
}
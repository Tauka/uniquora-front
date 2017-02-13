import React from 'react';
import QuestionFeed from '../components/questionFeed';

export default class FeedMainWrapper extends React.Component {

	render() {
		return (
			<div class="feed-main d-flex flex-row justify-content-center">
				{ React.cloneElement(this.props.children, { questions: this.props.questions })}
				<div class="right-content">
				<div class="card user-card m-auto">
					<div class="card-header">
						Tauyekel Kunzhol
					</div>
					<div class="card-block">
					  	<div class="user d-flex flex-row">
					  		<img class="user-image d-inline-block" src="http://bit.ly/2jPuuGT" />
					  		<div class="user-info d-inline-block ml-2 d-flex flex-column justify-content-around">
					  			<div class="user-info-stats">
					  				<i class="fa fa-heart fa-lg d-inline-block" aria-hidden="true"/>
					  				<div class="user-info-stats-points d-inline-block ml-1">
					  					750
					  				</div> 
					  				<i class="fa fa-question fa-lg d-inline-block ml-2" aria-hidden="true"/>
					  				<div class="user-info-stats-questions d-inline-block ml-1">
					  					5
					  				</div> 
					  			</div>
					  			<div class="user-info-details">SST, CS 2nd year</div>
					  		</div>
					  	</div>
					  </div>
				  </div>

					{/*<div class="card trending-card mt-5 ml-auto mr-auto">
						<div class="card-header">
							Trending questions
						</div>
					  	<div class="list-group">
					  	  <a class="list-group-item list-group-item-action">
					  	  	Cras justo odio 
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div> 
					  	  </a>
					  	  <a class="list-group-item list-group-item-action">
					  	  	Dapibus ac facilisis in
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div>
					  	  </a>
					  	  <a class="list-group-item list-group-item-action">
					  	  	Morbi leo risus
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div>
					  	  </a>
					  	  <a class="list-group-item list-group-item-action">
					  	  	Porta ac consectetur a
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div>
					  	  </a>
					  	  <a class="list-group-item list-group-item-action">
					  	  	Vestibulum at eros
					  	  	<div class="badge badge-pill badge-info d-inline ml-auto">CSCI151</div>
					  	  </a>
					  	</div>
					</div>*/}
					</div>
			</div>
		);
	}
}
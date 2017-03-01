import React from 'react';
import '../css/emailConfirm.scss';
import { hashHistory } from 'react-router';

export default class EmailConfirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmed: null
		}
	} 

	componentWillMount() {
        fetch(`http://${API_ROOT}/api/confirm?code=${this.props.location.query.code}&id=${this.props.location.query.id}`)
        .then((resp) => {
        	if (resp.ok) {
        		this.setState({
        			confirmed: true
        		});

        		setTimeout(() => {
        		    this.props.router.push('/auth');
        		}, 2000);
        	} else {
        		this.setState({
        			confirmed: false
        		});
        	}
        })
        // .then((json) => {
        // 	// console.log(json);
        // 	// this.setState({
        // 	// 	confirmed: true
        // 	// });

        // 	// console.log(json);

        // 	
        // })
        .catch((er) => {
        	this.setState({
        		confirmed: false
        	})
          	console.log("ERROR", er);
        });
	}

	render() {
		let render = null;

		if (this.state.confirmed == true) {
			render = <div class="email-confirm-wrapper">
						<h1> Your email has been confirmed </h1>
						<h5>redirecting...</h5>
						<i class="fa fa-cog fa-spin fa-3x fa-fw mt-4"></i>
					</div>;
		} else if (this.state.confirmed == false) {
			render = <div class="email-confirm-wrapper">
						<h1> There has been error. Try again </h1>
						<i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i>
					</div>
		} else {
			render = <div class="loading d-flex justify-content-center align-items-center">
							<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
			 		</div>;
		}

		return(
			render
		);
	}
}
import React from "react";

export default class AppContainer extends React.Component {

	render() {

		console.log(this.props.children);
		
		return (
			this.props.children
			);
	}
}
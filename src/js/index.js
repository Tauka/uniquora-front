import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
//import "./leaflet";
import { Provider } from "react-redux";
import store from "./store";
// import "animate.css";



// import "./css/index.css";
// import "./animations";

// import "milligram";

import AppContainer from "./pages/AppContainer"
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import QuestionExtended from "./pages/QuestionExtended"



const app = document.getElementById('app');

ReactDOM.render(
	<Provider store={store}>
		<Router history = {browserHistory}>
			<Route path="/" component={AppContainer} >
				<IndexRoute name="auth" component={Auth}></IndexRoute>
				<Route path="feed" component={Feed}/>
				<Route path="question/:questionId" component={QuestionExtended}/>
			</Route>
		</Router>
	</Provider>, 
app);
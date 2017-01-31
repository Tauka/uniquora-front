import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
//import "./leaflet";
import { Provider } from "react-redux";
import store from "./store";
import $ from "jquery";
import Tether from "tether";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './css/font-awesome/font-awesome.min.css';
import './css/global.scss';


import AppContainer from "./pages/AppContainer"
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import QuestionExtended from "./pages/QuestionExtended";
import FeedMainWrapper from "./pages/FeedMainWrapper";
import FeedMain from "./pages/FeedMain";



const app = document.getElementById('app');

ReactDOM.render(
	<Provider store={store}>
		<Router history = {browserHistory}>
			<Route path="/" component={AppContainer} >
				<Route path="" name="feed" component={Feed}>
					<Route path="" name="feed-main-wrapper" component={FeedMainWrapper}>
						<IndexRoute name="feed-main" component={FeedMain}/>
						<Route path="question/:questionId" name="feed-question-extended" component={QuestionExtended}/>
					</Route>
				</Route>
				<Route path="auth" component={Auth}/>
			</Route>
		</Router>
	</Provider>, 
app);
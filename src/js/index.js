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
// import MapComponent from "./pages/Map";
import Auth from "./pages/Auth";



const app = document.getElementById('app');

ReactDOM.render(
	<Provider store={store}>
		<Router history = {browserHistory}>
			<Route path="/" component={AppContainer} >
				<IndexRoute name="auth" component={Auth}></IndexRoute>
			</Route>
		</Router>
	</Provider>, 
app);
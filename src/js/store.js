import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "./reducers";

let middlewares = [
	promise(),
	thunk
];

if (DEBUG) {
	middlewares.push(logger());
}

const middleware = applyMiddleware(...middlewares);

export default createStore(reducer, middleware);
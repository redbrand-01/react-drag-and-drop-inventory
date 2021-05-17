import { compose, createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"

import { inv } from "./reduser/inv";

const rootReducer = combineReducers({
  inv
});

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

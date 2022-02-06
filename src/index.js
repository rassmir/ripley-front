import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "react-data-table-component-extensions/dist/index.css";
import App from './App';
import {Provider} from "react-redux";
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
const loggerMiddleware = createLogger();

export const store = createStore(
    reducers, //Todos los reducers
    composeWithDevTools(
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);


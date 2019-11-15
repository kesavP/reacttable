import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bootstart from './Bootstart';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import registerServiceWorker from './registerServiceWorker';
const store = createStore(rootReducer); 
ReactDOM.render(
  <Provider store={store}>
    <Bootstart />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

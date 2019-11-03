import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Index from './components/Index';
import Indexpage from './components/Indexpage';
import Home from './components/Home';
import GettingStarted from './components/GettingStarted';
import PageNotFound from './components/PageNotFound';
import Basic from './basic/demo';
import Column from './column/demo';
import ColumnFilter from './column-filter/demo';

class Bootstart extends React.Component {
  render() {
    return (
      <React.Fragment>
      <Router history={ hashHistory }>
        <Route exact path='/' component={ Indexpage }/>
        <IndexRoute component={ Home } />
        <Route path='getting-started' component={ GettingStarted }/>
        <Route path='examples'>
        <Route path='basic' component={ Basic } />
        <Route path='column' component={ Column } />
        <Route path='column-filter' component={ ColumnFilter } />
        </Route>
      </Router>
      </React.Fragment>
  )}
};

export default Bootstart;

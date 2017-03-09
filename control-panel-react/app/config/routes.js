import React from 'react';
import Product from '../components/Product';
import { Router, Route, Link, hashHistory, browserHistory} from 'react-router'
import AppState from '../utils/AppState.js'
import RoboViewer from '../components/RoboViewer';

export default (
  <Router history={browserHistory}>

 	<Route path="/viewer" component={RoboViewer} />
	
  </Router>
);
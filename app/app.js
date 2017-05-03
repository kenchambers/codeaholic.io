var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var Home = require('./controllers/home');
var Router = require('react-router').Router;

var browserHistory = require('react-router').browserHistory;
var injectTapEventPlugin = require('react-tap-event-plugin');
import { BrowserRouter, Route } from 'react-router-dom'


import HomeController from './controllers/home';

import * as WHS from 'whs'


require('./app.less')
injectTapEventPlugin();

window.onload = function() {
  ReactDOM.render((
    <BrowserRouter>

      <Route component={HomeController} name='home' path='/' ignoreScrollBehavior/>

    </BrowserRouter>
  ), document.querySelector('#app-target'));
}

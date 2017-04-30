var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
// var Home = require('./controllers/home');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var injectTapEventPlugin = require('react-tap-event-plugin');
import HomeController from './controllers/home';
// import MapController from './controllers/map';
require('./app.less')
injectTapEventPlugin();

window.onload = function() {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={HomeController} name='home' path='/app' ignoreScrollBehavior/>
      <Route component={MapController} name='map' path='/map' ignoreScrollBehavior/>
    </Router>
  ), document.querySelector('#app-target'));
}

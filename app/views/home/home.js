
import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Alert } from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import ls from 'local-storage'
import $ from 'jquery'
import './home.less'

export default class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      active_view: "about"
    }

  }




  render() {



   return (



     <div id="home-component-container" ref="salad_shooter">


     </div>
   );
 }

}

Home.displayName = "Home"
Home.propTypes = {

}

Home.defaultProps = {

}

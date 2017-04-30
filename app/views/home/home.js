
import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import ls from 'local-storage'
import $ from 'jquery'
import './home.less'



export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.onChange = (address) => this.setState({ address })


    this.state = {

    }

  }


  componentDidUpdate(){


  }
  componentDidMount() {

  }

  componentWillUnmount() {

  }






// ***********************************
//start private component methods :
// ***********************************


// Generate Map Preview Base 64 Image
//==================================



  render() {





    return (



    <div id='home-component'>
    
    </div>
    )
  }

}

HomeView.displayName = "HomeView"
HomeView.propTypes = {

}

HomeView.defaultProps = {

}

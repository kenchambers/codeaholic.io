import React, {Component} from 'react';
import ls from 'local-storage'
import HomeView from '../views/home'
import $ from 'jquery'




export default class HomeController extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

    this.setState({

    })


  }
  render() {

    return (
      <HomeView/>
    )
  }




}

HomeController.displayName = "HomeController"
HomeController.propTypes = {

}

HomeController.defaultProps = {

}

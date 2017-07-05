import React, {Component} from 'react';
import $ from 'jquery'
import './blog.less'

export class Blog extends React.Component {
  constructor(props){
    super(props)
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.state = {
      show: true,
      style :{
        fontSize: 60,
        opacity: 0,
        transform: 'perspective(500px) translateZ(600px)',
        transition: 'all 2s ease'
      }

    }

    window.fadeThreeJS()
  }

  componentWillReceiveProps(newProps) { //check for the mounted props
    if(!newProps.mounted)
      return this.unMountStyle() //call outro animation when mounted prop is false
    this.setState({ //remount the node when the mounted prop is true
      show: true
    })
    setTimeout(this.mountStyle, 10) //call the into animiation
  }

  unMountStyle() { //css for unmount animation

    this.setState({
      style: {
        fontSize: 60,
        opacity: 0,
        transform: 'perspective(500px) translateZ(600px)',
        transition: 'all 2s ease',
      }
    })
  }

  mountStyle() { // css for mount animation
    this.setState({
      style: {
        fontSize: 60,
        opacity: 1,
        transition: 'all 2s ease',
      }
    })
  }
  componentDidMount(){
    console.log("component mounting")
    setTimeout(this.mountStyle, 10) //call the into animiation
  }

  transitionEnd(){
    console.log("transistion end fired")
    if(!this.props.mounted){ //remove the node on transition end when the mounted prop is false
      this.setState({
        show: true
      })
    }
  }

  render() {
    return (

      this.state.show &&

      <div style={this.state.style} onTransitionEnd={this.transitionEnd}>
        <h2>BLOG POSTS GO HERE</h2>

      </div>
    );
  }
}

export default Blog

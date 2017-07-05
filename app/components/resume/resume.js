import React, {Component} from 'react';

// import ls from 'local-storage'
import $ from 'jquery'
import './resume.less'

export class Resume extends React.Component {
  constructor(props){

    super(props)
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.resumeAnimations = this.resumeAnimations.bind(this)

    this.state = {
      show: true,
      style :{
        fontSize: 60,
        opacity: 0,
        transform: 'perspective(500px) translateZ(600px)',
        transition: 'all 2s ease',
      }

    }

    window.fadeThreeJS()
  }

  componentWillReceiveProps(newProps) { //check for the mounted props
    console.log("inside of resume ---- componentWillReceiveProps --->", newProps.mounted)
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

    setTimeout(this.resumeAnimations(),100)
  }

  resumeAnimations(){
    console.log("RESUME ANIMATIONS FIRING")

  }

  render() {
    return (

      this.state.show &&

      <div id="resume-container-component">

        <div style={this.state.style} onTransitionEnd={this.transitionEnd}>
          <div className="resume-title">
            <h2>Skills & Experience</h2>
          </div>


        </div>
      </div>

    );
  }
}

export default Resume

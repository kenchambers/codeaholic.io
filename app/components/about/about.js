import React, {Component} from 'react';
import $ from 'jquery'
import './about.less'
import { CSSTransitionGroup } from 'react-transition-group' // ES6



export class About extends React.Component {
  constructor(props) {
    super(props)
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.animateParagraphs = this.animateParagraphs.bind(this)
    this.state = {
      animation_buffer: [],
      data: props.data,
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

  unMountStyle() {

    this.setState({
      style: {
        fontSize: 60,
        opacity: 0,
        transform: 'perspective(500px) translateZ(600px)',
        transition: 'all 2s ease'
      }
    })
  }


  mountStyle() {

    this.setState({
      style: {
        fontSize: 60,
        opacity: 1,
        transition: 'all 2s ease'
      }
    })
  }
  componentDidMount(){

    setTimeout(this.mountStyle, 10) //call the into animiation
  }

  animateParagraphs(){
    console.log("ANIMATE PARAGRAPHS RUNNING YALL")
    const animation_buffer = []

    setTimeout(
      animation_buffer.push([
        <div className="about-animation-group">
        <h2>Hello World;</h2>
        <h3>My name is Ken I'm a Web developer </h3>
        <p>
          <span>I am currently Based in Orange County California!</span>
        </p>
        <p>
          <span>I've coded for 2 different companies now.</span>
        </p>
        </div>
        ]
      ),100
    )
    setTimeout(
      animation_buffer.push([
        <div className="about-animation-group">
        <p>
          <span>
            At the first Company <a>Critiqueit</a>, I got to be a pivitol part of the growth of the company, as the company grew from a couple of bean bags in a house to a fully staffed office.
          </span>
        </p>
        </div>
        ]
      ),200
    )
    setTimeout(
      animation_buffer.push([
        <div className="about-animation-group">
        <p>

          <span>
            My experience was a crash course in AGILE workflow, where I helped develop and implement scrum methods in the engineering department.
          </span>
        </p>
        </div>
        ]
      ),300
    )
    setTimeout(
      animation_buffer.push([
        <div className="about-animation-group">
        <p>
          <span>
          There, I Cut my teeth on Javascript MVC frameworks , as we migrated the codebase from a LAMP stack to newer frameworks like NODE JS, Angular, than React.
          </span>
        </p>
        </div>
        ]
      ),400
    )
    setTimeout(
      animation_buffer.push([
        <div className="about-animation-group">
        <p>
          <span>
            At the second Company <a>Hireiris</a>, they were looking to integrate a web based app into an already existing infrastructure to solve a need for efficieny - they decided to pivot by using tech that would streamline the workflow. This application was both client facing and also used for Internal management.
          </span>
        </p>
        </div>
        ]
      ),500
    )
    setTimeout(
      animation_buffer.push([
        <div className="about-animation-group">
        <p>
          <span>
            Here I got to let my imagination, and ingenuity run wild , as me and <a>1 other developer</a> got to engineer and architect a Standalone React/Flux front-end , and also build out a fully loaded Rails Backend API .
          </span>
        </p>
        </div>
        ]
      ),600
    )
    setTimeout(
      animation_buffer.push([
        <div className="about-animation-group">
        <p>
          <span>
            This application utilized the latest web technologies , with a faye socket server used for notifications, leverging the power of Paypals Mass Payout API - to payout the employees, a 5 star rating system for the employees, read receipts for messages, and a complex action layer to provide accountability for every action taken on the application.
          </span>
        </p>
        </div>
        ]
      ),700
    )

    console.log("---->",animation_buffer)

    this.setState({
      animation_buffer: animation_buffer
    })

    console.log("====>",this.state)
  }


  transitionEnd(){


    if(!this.props.mounted){ //remove the node on transition end when the mounted prop is false
      this.setState({
        show: true
      })
    }

    this.animateParagraphs()

  }

  render() {



    return (

      this.state.show &&

      <div style={this.state.style} onTransitionEnd={this.transitionEnd}>
        <img id="ken_about_img" src={this.state.data.profile_pic}></img>
        <div className='about-welcome-text-headline'>
          <CSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
          {this.state.animation_buffer}
          </CSSTransitionGroup>

        </div>
      </div>
    )
  }



}
export default About

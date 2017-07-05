// load dependencies
import React from 'react';
import ReactDOM from 'react-dom'
import { render } from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// load components
import Home from './components/home'
import Blog from './components/blog'
import Code from './components/code'
import About from './components/about'
import Contact from './components/contact'
import Resume from './components/resume'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6
import AOS from 'aos';
import $ from 'jquery'

// load css
import './app.less';
import './aos.css';


class App extends React.Component {

  constructor(props){
    super(props)
    this.buttonClick = this.buttonClick.bind(this)
    AOS.init();

    this.state = {
      showChild: false,
      profile_pic: null
    }
    this.__loadData()
  }

  componentWillReceiveProps (){
    AOS.refresh();
  }

  componentWillMount() {

  }
  buttonClick(){
    this.setState({
      showChild: !this.state.showChild
    })
  }

  __loadData(){
    var self = this;

    const profile_pic = FB.api(
      "/100005489230160/picture?type=large",
      function (response) {
        if (response && !response.error) {
          self.setState({
            profile_pic: response.data.url
          })

        }
      }
    );



  }
  __delay (URL) {
    setTimeout( function() { window.location = URL }, 500 );
  }

  __mountState (){
    console.log("Mount state hit");
  }

  render(){
    var self = this;



    return(
      <Router>

         <Route render={({ location }) => (
           <div id="codeaholic-container">

             <Route exact path="/"
               value="home"
               component={function(){
                 return (
                   <div id="home-component-container">
                     <Home mounted={self.state.showChild} data={self.state}/>
                   </div>
                 )
               }}
               location={location}
               key={1}
               props={self.state}/>

             <Route exact path="/about"
               value="about"
               component={function(){
                 return (
                   <div id="about-component-container">
                     <About mounted={self.state.showChild} data={self.state}/>
                       <Link to="/resume">
                         <div className="main-menu-container">
                          <button onClick={self.buttonClick} className="pure-button"><h3>Resume</h3></button>
                         </div>
                       </Link>
                   </div>
                 )
               }}
               location={location}
               key={2}
               props={self.state}/>
             <Route path="/resume"
               value="resume"
               component={function(){
                 return (
                   <div className="resume-component-container">
                     <Resume mounted={self.state.showChild} data={self.state}/>
                     <Link to="/contact">
                       <div className="main-menu-container">
                        <button onClick={self.buttonClick} className="pure-button"><h3>Contact</h3></button>
                       </div>
                     </Link>
                   </div>
                 )
               }}
               location={location}
               key={3}
               props={self.state}/>
             <Route exact path="/contact"
               value="contact"
               component={function(){
                 return (
                    <div className="contact-component-container">
                      <Contact mounted={self.state.showChild} data={self.state}/>
                      <Link to="/blog">
                        <div className="main-menu-container">
                         <button onClick={self.buttonClick} className="pure-button"><h3>Blog</h3></button>
                        </div>
                      </Link>
                    </div>
                 )
               }}
               location={location}
               key={4}
               props={self.state}/>
             <Route path="/blog"
               value="blog"
               component={function(){
                 return (
                    <div className="blog-component-container">
                       <Blog data={self.state}/>
                       <Link to="/">
                         <div className="main-menu-container">
                          <button onClick={self.buttonClick} className="pure-button"><h3>Home</h3></button>
                         </div>
                       </Link>
                    </div>
                 )
               }}
               location={location}
               key={5}
               props={self.state}/>
           </div>


         )}/>

       </Router>

    )
  }

}


window.onload = function() {

  ReactDOM.render((

      <App />

  ), document.getElementById('app-target'))

}

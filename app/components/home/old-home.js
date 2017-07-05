import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Parallax from 'react-springy-parallax'
import Animated from 'animated/lib/targets/react-dom'
import Easing from 'animated/lib/Easing'

import './home.less';

export class Home extends React.Component {
  constructor(props){

    super(props)
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.loadBokeh = this.loadBokeh.bind(this)
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
    // this.loadBokeh()

  }

  loadBokeh() {

        /**

    thanks to travis codepen!!
    https://codepen.io/trhino/pen/JFmiK
     * Generates random particles using canvas
     *
     * @class Particles
     * @constructor
     */
    function Particles(){
      //particle colors
      this.colors = [
        '255, 255, 255',
        '0, 74, 89',
        '21, 224, 189'
      ]
      //adds gradient to particles on true
      this.blurry = true;
      //adds white border
      this.border = false;
      //particle radius min/max
      this.minRadius = 5;
      this.maxRadius = 20;
      //particle opacity min/max
      this.minOpacity = .005;
      this.maxOpacity = .5;
      //particle speed min/max
      this.minSpeed = .05;
      this.maxSpeed = .5;
      //frames per second
      this.fps = 60;
      //number of particles
      this.numParticles = 100;
      //required canvas variables
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Initializes everything
     * @method init
     */
    Particles.prototype.init = function(){
      this.render();
      this.createCircle();
    }

    /**
     * generates random number between min and max values
     * @param  {number} min value
     * @param  {number} max malue
     * @return {number} random number between min and max
     * @method _rand
     */
    Particles.prototype._rand = function(min, max){
      return Math.random() * (max - min) + min;
    }

    /**
     * Sets canvas size and updates values on resize
     * @method render
     */
    Particles.prototype.render = function(){
      var self = this,
          wHeight = $(window).height(),
          wWidth = $(window).width();

      self.canvas.width = wWidth;
      self.canvas.height = wHeight;

      $(window).on('resize', self.render);
    }

    /**
     * Randomly creates particle attributes
     * @method createCircle
     */
    Particles.prototype.createCircle = function(){
      var particle = [];

      for (var i = 0; i < this.numParticles; i++) {
        var self = this,
            color = self.colors[~~(self._rand(0, self.colors.length))];

        particle[i] = {
          radius    : self._rand(self.minRadius, self.maxRadius),
          xPos      : self._rand(0, canvas.width),
          yPos      : self._rand(0, canvas.height),
          xVelocity : self._rand(self.minSpeed, self.maxSpeed),
          yVelocity : self._rand(self.minSpeed, self.maxSpeed),
          color     : 'rgba(' + color + ',' + self._rand(self.minOpacity, self.maxOpacity) + ')'
        }

        //once values are determined, draw particle on canvas
        self.draw(particle, i);
      }
      //...and once drawn, animate the particle
      self.animate(particle);
    }

    /**
     * Draws particles on canvas
     * @param  {array} Particle array from createCircle method
     * @param  {number} i value from createCircle method
     * @method draw
     */
    Particles.prototype.draw = function(particle, i){
      var self = this,
          ctx = self.ctx;

      if (self.blurry === true ) {
        //creates gradient if blurry === true
        var grd = ctx.createRadialGradient(particle[i].xPos, particle[i].yPos, particle[i].radius, particle[i].xPos, particle[i].yPos, particle[i].radius/1.25);

        grd.addColorStop(1.000, particle[i].color);
        grd.addColorStop(0.000, 'rgba(21, 224, 189, 0)');
        ctx.fillStyle = grd;
      } else {
        //otherwise sets to solid color w/ opacity value
        ctx.fillStyle = particle[i].color;
      }

      if (self.border === true) {
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(particle[i].xPos, particle[i].yPos, particle[i].radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }

    /**
     * Animates particles
     * @param  {array} particle value from createCircle & draw methods
     * @method animate
     */
    Particles.prototype.animate = function(particle){
      var self = this,
              ctx = self.ctx;

      setInterval(function(){
        //clears canvas
        self.clearCanvas();
        //then redraws particles in new positions based on velocity
        for (var i = 0; i < self.numParticles; i++) {
          particle[i].xPos += particle[i].xVelocity;
          particle[i].yPos -= particle[i].yVelocity;

          //if particle goes off screen call reset method to place it offscreen to the left/bottom
          if (particle[i].xPos > self.canvas.width + particle[i].radius || particle[i].yPos > self.canvas.height + particle[i].radius) {
            self.resetParticle(particle, i);
          } else {
            self.draw(particle, i);
          }
        }
      }, 1000/self.fps);
    }

  /**
   * Resets position of particle when it goes off screen
   * @param  {array} particle value from createCircle & draw methods
   * @param  {number} i value from createCircle method
   * @method resetParticle
   */
    Particles.prototype.resetParticle = function(particle, i){
      var self = this;

      var random = self._rand(0, 1);

      if (random > .5) {
        // 50% chance particle comes from left side of window...
        particle[i].xPos = -particle[i].radius;
        particle[i].yPos = self._rand(0, canvas.height);
      } else {
        //... or bottom of window
        particle[i].xPos = self._rand(0, canvas.width);
        particle[i].yPos = canvas.height + particle[i].radius;
      }
      //redraw particle with new values
      self.draw(particle, i);
    }

    /**
     * Clears canvas between animation frames
     * @method clearCanvas
     */
    Particles.prototype.clearCanvas = function(){
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    // go go go!
    var particle = new Particles().init();

  }

  componentWillReceiveProps(newProps) { //check for the mounted props
    console.log("++++++++++++++++++++++++++++++++++++")
    console.log("COMPONENT WILL RECEIVE PROPS",newProps)
    console.log("++++++++++++++++++++++++++++++++++++")

    if(!newProps.mounted)
      return this.unMountStyle() //call outro animation when mounted prop is false
    this.setState({ //remount the node when the mounted prop is true
      show: true
    })
    setTimeout(this.mountStyle, 10) //call the into animiation
  }

  unMountStyle() { //css for unmount animation

    // console.log("SET: unmount style")
    this.setState({
      style: {
        height: '100%',
        fontSize: 60,
        opacity: 0,
        transform: 'perspective(500px) translateZ(600px)',
        transition: 'all 2s ease',
      }
    })
  }

  mountStyle() { // css for mount animation
    // console.log("SET: mount style")

    this.setState({
      style: {
        height: '100%',
        fontSize: 60,
        opacity: 1,
        transition: 'all 2s ease'
      }
    })
  }

  runTyped(){
    // console.log("RUN TYPED RUNNNING")
    Typed.new('.typed_element', {
			stringsElement: document.getElementById('typed-strings'),
      showCursor: true,
	     // character for cursor
	    cursorChar: "|"

		});
  }

  componentDidMount(){
    // console.log("component mounting")
    setTimeout(this.runTyped, 20)
    setTimeout(this.mountStyle, 10) //call the into animiation
    setTimeout(this.loadBokeh, 30) //call the into animiation

  }

  transitionEnd(){
    // console.log("transistion end fired")
    if(!this.props.mounted){ //remove the node on transition end when the mounted prop is false
      this.setState({
        show: true
      })
    }
  }

  render() {
    var self = this;
    const styles = {
             fontFamily: 'Menlo-Regular, Menlo, monospace',
             fontSize: 14,
             lineHeight: '10px',
             color: 'white',
             display: 'flex', alignItems: 'center', justifyContent: 'center',

         }
    return (

      this.state.show &&

      <div style={this.state.style}>

        <div id="typed-strings">
          <p>

              <li>initialize run sequence:</li>
              <li>npm WARN deprecated node@0.0.0: To</li>
              <li>update or install node, go to</li>
              <li>http:nodejs.org/</li>
              <li>npm WARN checkPermissions Missing write access to</li> <li>/Users/sudo/Sites/test_install</li>
              <li>/Users/sudo/Sites/test_install</li>
              <li>├─┬ js@0.1.0 </li>
              <li>│ └─┬ commander@1.1.1 </li>
              <li>│   └── keypress@0.1.0 </li>
              <li>└── node@0.0.0 </li>
              <li>....</li>
              <li>.....</li>
              <li>......</li>
              <li>......</li>
              <li>......</li>
              <li>......</li>

              <li>Hey there! welcome to the Personal creation of <b>Kenneth Chambers</b></li>
              <li>
              If your trying to get more info on that dude,  youve come to the right place!
              </li>
              <li>
              This website is a place where Ken has manipulated the interwebs to do his bidding
              </li>
              <li>
              Bwahahhahahahahahahahahahahhahahahahahahahhahahahahahahahhahahahahahahahhahahahahahahahhahahahahahahahhahahahahahahahhahahahahahahahhahahahahahahahhahahahahahahahha
              </li>
              <li>
              If your loooking to Hire ken , please disregard any un-proffessionalis that you will most definitly see here on his webpage..........................
              </li>
              <li>
              If your wondering if you should give him a call, just do it, do ittt..........................
              </li>
              <li>
              Go ahead and click that button below
              </li>
              <li> Loook.......</li>
              <li>loook at that button glowing ...</li>
              <li> scroll down a bit youll see it....</li>

          </p>

        </div>

        <Parallax
          ref="parallax"
          pages={1.1}>


               <Parallax.Layer offset={0} speed={2} style={{ zIndex: '98' }}>
                 <img className="moon-guy" src="/img/moon.png"/>
               </Parallax.Layer>

               <Parallax.Layer offset={0} speed={.1} style={{ zIndex: '90' }}>
                 <img className="space-bg-img" src="/img/space.jpg"/>
               </Parallax.Layer>

               <Parallax.Layer offset={.3} speed={.1} style={{ zIndex: '91' }}>
                 <div className="space-bg-fade-transistion"></div>

               </Parallax.Layer>


               <Parallax.Layer offset={.9} speed={.1} style={{ zIndex: '90' }}>
                 <img className="space-bg-img" src="/img/space.jpg"/>
               </Parallax.Layer>

               <Parallax.Layer offset={.3} speed={3} style={{ zIndex: '99' }}>
                 <div id="fb-profile-pic-container">
                   <img src={this.props.data.profile_pic}></img>
                 </div>
               </Parallax.Layer>

               <Parallax.Layer offset={.2} speed={2} style={{ zIndex: '99' }}>
                 <canvas id="canvas"></canvas>
               </Parallax.Layer>

               <Parallax.Layer offset={.7} speed={4} style={{ zIndex: '99' }}>
                 <div className="console-container">

                    <div className="shell-wrap">
                    <p className="shell-top-bar">~/Users/codeaholic/Documents/Ken Chambers/</p>
                      <ul className="shell-body">

                        <span className="typed_element"></span>

                      </ul>
                    </div>

                 </div>
               </Parallax.Layer>

               <Parallax.Layer offset={.98} speed={2} style={{ zIndex: '99' }}>

               </Parallax.Layer>

        </Parallax>




        <span>HOME COMPONENT SALAD</span>
        <div className="label-name-container" data-aos="fade-in" data-aos-anchor-placement="top-center"></div>


          <div >resume</div>


      </div>
    );
  }
}

export default Home

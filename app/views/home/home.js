
import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { ListGroup, Alert } from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import ls from 'local-storage'
import $ from 'jquery'
import './home.less'

export default class HomeView extends Component {


  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }




  handleAdd() {
      const newItems = this.state.items.concat([
        prompt('Enter some text')
      ]);
      this.setState({items: newItems});
    }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }


  render() {




   const items = this.state.items.map((item, i) => (
     <div key={item} onClick={() => this.handleRemove(i)}>
       {item}
     </div>
   ));





   return (




     <div ref="salad_shooter">



       <button onClick={this.handleAdd}>Add Item</button>
       <CSSTransitionGroup
         transitionName="example"
         transitionAppear={true}
         transitionAppearTimeout={500}
         transitionEnterTimeout={500}
         transitionLeaveTimeout={300}>
         {items}
       </CSSTransitionGroup>
     </div>
   );
 }

}

HomeView.displayName = "HomeView"
HomeView.propTypes = {

}

HomeView.defaultProps = {

}

import React, {Component} from 'react';
import ls from 'local-storage'
import HomeView from '../views/home'
import $ from 'jquery'


export default class HomeController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_collection: new UserStore()
    }
  }
  componentDidMount() {
    this.state.user_collection.bind('add change', this.__handleStoreUpdates.bind(this))
    this.state.map_collection.bind('add change', this.__handleStoreUpdates.bind(this))
    this.state.cart_collection.bind('add change', this.__handleStoreUpdates.bind(this))
    this.setState({

    })

    var user = this.__get_existing_user();
    var map = this.__get_active_map(true);
    // this.state.user_collection.add(user)

    UserActions.create(user)
    MapActions.create(map)




  }
  render() {

    return (
      <HomeView
        user={this.__get_existing_user()}
        map={this.__get_active_map()}
        cart_items={this.state.cart_items}
        onAddNewMapClick={this.__handleAddNewMapClick.bind(this)}
        />
    )
  }




  __handleAddNewMapClick() {

    console.log("ADDING NEW MAPPYYYY");
    var map = new Map({
      id: Map.generate_random_id(),
      style: this.props.location.query.style || "tiff-fav",
      orientation: this.props.location.query.orientation || "landscape",
      label_style: this.props.location.query.label_style || "modern",
      label_header: this.props.location.query.label_header || "Los Angeles",
      label_sub_header: this.props.location.query.label_sub_header || "California",
      size: this.props.location.query.size || "1",
      location_x: 33.7994,
      location_y: -118.1601,
      location_z: 13,
      edit_active: true
    })

    MapActions.create(map)
    // CartActions.create({map: this.props.map})
  }
  __get_existing_user() {
    var user
    var user_data = ls.get('user')
    if (!user_data) {
      user = new User({id: User.generate_random_id()})
      return user
    }

    user = this.state.user_collection.findWhere({id: user_data.id})

    if (user) {
      return user
    }
    return new User(user_data)

  }
  __get_active_map(initialize) {
    var map
    var map_data = ls.get('active_map')
    initialize = initialize || false

    if (!map_data && initialize) {

      map = new Map({
        id: Map.generate_random_id(),
        style: this.props.location.query.style || "tiff-fav",
        orientation: this.props.location.query.orientation || "landscape",
        label_style: this.props.location.query.label_style || "modern",
        label_header: this.props.location.query.label_header || "Los Angeles",
        label_sub_header: this.props.location.query.label_sub_header || "California",
        size: this.props.location.query.size || "1",
        location_x: (this.props.location.query.x * 1) || 33.7994,
        location_y: (this.props.location.query.y * 1) || -118.1601,
        location_z: (this.props.location.query.z * 1) || 13,
        edit_active: true
      })
      return map
    }

    //initial load of page, and Map data exists in LS
    if (map_data && initialize === true) {
      // return new Map(map_data)
      map = new Map({
        id: Map.generate_random_id(),
        style: this.props.location.query.style || "tiff-fav",
        orientation: this.props.location.query.orientation || "landscape",
        label_style: this.props.location.query.label_style || "modern",
        label_header: this.props.location.query.label_header || "Los Angeles",
        label_sub_header: this.props.location.query.label_sub_header || "California",
        size: this.props.location.query.size || "1",
        location_x: (this.props.location.query.x * 1) || 33.7994,
        location_y: (this.props.location.query.y * 1) || -118.1601,
        location_z: (this.props.location.query.z * 1) || 13,
        edit_active: true
      })
      return map
    }


    map = this.state.map_collection.findWhere({edit_active: true}) || new Map({})


    if (initialize) {

      map.attributes.style = this.props.location.query.style || map.attributes.style || "tiff-fav"
      map.attributes.orientation = this.props.location.query.orientation || map.attributes.orientation || "landscape"
      map.attributes.label_style = this.props.location.query.label_style || map.attributes.label_style
      map.attributes.label_header = this.props.location.query.label_header || map.attributes.label_header
      map.attributes.label_sub_header = this.props.location.query.label_sub_header || map.attributes.label_sub_header
      map.attributes.size = this.props.location.query.size || map.attributes.size
      map.attributes.location_x = (this.props.location.query.x * 1) || map.attributes.location_x
      map.attributes.location_y = (this.props.location.query.y * 1) || map.attributes.location_y
      map.attributes.location_z = (this.props.location.query.z * 1) || map.attributes.location_z
    }

    // console.log("------------->")
    // console.log("------------->")

    return map
  }

  __handleStoreUpdates() {
    this.setState({
      user: this.__get_existing_user(),
      map: this.__get_active_map(),
      cart_items: this.state.cart_collection.models
    })
  }
}

HomeController.displayName = "HomeController"
HomeController.propTypes = {

}

HomeController.defaultProps = {

}

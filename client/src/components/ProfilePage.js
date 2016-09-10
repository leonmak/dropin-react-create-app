import React, {Component} from 'react';

export default class ProfilePage extends Component {
  state = {
    profile: 'hi'
  }

  render() {
    return(
      <div className="row center-xs">
        <div className="col-xs-6">Hello, {this.state.profile} !</div>
      </div>
      )
  }
}

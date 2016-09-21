import React, {Component, PropTypes} from 'react';
import AddForm from './AddForm';
import {browserHistory} from 'react-router';

class AddComponent extends Component {

  componentWillMount(){
    if(!this.props.user) {
      this.props.passSnackbarMessage('Log in to add new message')
      browserHistory.push('/login');
    }
  }


  render() {
    return (
      <div className="row center-xs">
        <div className="col-xs-12">
            <AddForm user={this.props.user} location={this.props.location} setLocation={this.props.setLocation} />
        </div>
      </div>
    )
  }
}

AddComponent.PropTypes = {
  passSnackbarMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default AddComponent;

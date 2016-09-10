import React, {Component} from 'react';
import AddForm from './AddForm';

class AddPage extends Component {
  render() {
    return (
      <div className="row center-xs">
        <div className="col-xs-12">
            <AddForm />
        </div>
      </div>
    )
  }
}

export default AddPage;

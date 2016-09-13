import React from 'react';
import {Drop} from './Drop';

/*const DropPage = (props) => (
  <Drop/>
)

export default DropPage;*/


const DropPage = React.createClass({

  render() {
    return (
      <div>
        <h2>hello</h2>
        {console.log(this.props.dropId)}
      </div>
    )
  }
})

export default DropPage;
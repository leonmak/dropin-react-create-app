import React, { PropTypes } from 'react';
import BottomBar from '../containers/BottomBar';
import TopBar from '../containers/TopBar';
import Headroom from 'react-headroom';
// import { RouteTransition } from 'react-router-transition';

// TODO: connect user to prop
const user = {
  "id": "001",
  "name": "Leon Mak",
  "facebookId": "590597559",
  "drops": 1,
  "comments": 12,
};

const App = (props) => {
  const childrenWithProps = React.Children.map(props.children,
    (child) => React.cloneElement(child, {
      user: user
    })
  );

  return (
    <div id="holder">

      <Headroom><TopBar/></Headroom>

      <div id="body">
        {childrenWithProps}
      </div>

      <BottomBar url={props.location.pathname} />

    </div>
    );
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object
};

export default App;

//better react routing here, but need logic
/*atEnter={{ translateX: 100 }}
atLeave={{ translateX: -100 }}
atActive={{ translateX: 0 }}
mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}*/

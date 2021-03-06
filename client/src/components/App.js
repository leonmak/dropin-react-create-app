import React, { PropTypes } from 'react';
import BottomBar from '../containers/BottomBar';
import TopBar from '../containers/TopBar';
import Snackbar from '../containers/SnackBar';
import Headroom from 'react-headroom';
//import {browserHistory} from 'react-router';
//import { RouteTransition } from 'react-router-transition';


const App = (props) => {

  return (
    <div id="holder">

    <Headroom><TopBar/></Headroom>

    <div id="body">
      {props.children}
    </div>
    <Snackbar />
    <BottomBar urlIdx={urlToIdx(props.location.pathname)} />

    </div>
    );
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object
};

export default App;


function urlToIdx(url) {
  let urlFmt = url.substring(1).toLowerCase();
  // /drops -> drops
  let urlArr = urlFmt.split('/');
  const firstLvl = urlArr[0];
  /*if(urlArr.length > 1 && firstLvl === "drops") {
    // drops/:id have second lvl
    return -1;
  }*/
  switch (firstLvl) {
    case 'drops':
    return 0;
    case 'map':
    return 1;
    case 'add':
    return 2;
    case 'profile':
    return 3;
    case 'settings':
    return 4;
    case '':
    return 0;
    default:
    return -1;
  }
}

//better react routing here, but need logic
/*atEnter={{ translateX: 100 }}
atLeave={{ translateX: -100 }}
atActive={{ translateX: 0 }}
mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}*/

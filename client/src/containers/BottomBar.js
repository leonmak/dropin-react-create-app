import {connect} from 'react-redux';

import BottomBarComponent from '../components/BottomBarComponent';


function mapStateToProps(state) {
  return {
    pageVisibility: state.pageVisibility
  }
}


const BottomBar = connect(
  mapStateToProps
)(BottomBarComponent);


export default BottomBar;
import {connect} from 'react-redux';

import TopBarComponent from '../components/TopBarComponent';


function mapStateToProps(state) {
  return {
    pageVisibility: state.pageVisibility
  }
}


const TopBar = connect(
  mapStateToProps
)(TopBarComponent);


export default TopBar;
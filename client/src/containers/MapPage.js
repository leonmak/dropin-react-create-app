import {connect} from 'react-redux';

import MapPageComponent from '../components/MapPageComponent';

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}


const MapPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPageComponent);


export default MapPage;

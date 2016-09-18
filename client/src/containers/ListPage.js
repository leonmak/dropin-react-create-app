import {connect} from 'react-redux';

import {fetchAllNearbyDrops} from '../actions';

import ListComponent from '../components/ListComponent';

function mapStateToProps(state) {
  return {
    drops: state.drops
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	fetchAllNearbyDrops:()=>{
  	  dispatch(fetchAllNearbyDrops());
  	}
  };
}


const ListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);


export default ListPage;
import {connect} from 'react-redux';

import {fetchAllNearbyDrops, updateANearbyDrop} from '../actions';

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
  	},
    updateANearbyDrop:(drop)=>{
      dispatch(updateANearbyDrop(drop));
    }
  };
}


const ListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);


export default ListPage;
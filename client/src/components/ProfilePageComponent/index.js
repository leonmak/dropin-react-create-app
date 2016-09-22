import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List} from '../ListComponent/List';
import {CommentsList} from '../CommentsList';
import FlatButton from 'material-ui/FlatButton';
import request from 'superagent';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

import * as fb from '../../utils/facebook-url';
import * as text from '../../utils/text';

import '../../styles/ProfilePage.css';

export default class ProfilePageComponent extends Component{

  constructor(props) {
    super(props);

    this.state = {
      isDialogOpen: false,
      dropId: null,
      userInfo: null,
    }

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.deleteDrop = this.deleteDrop.bind(this);
  }


  openDialog(dropId) {
    this.setState({ isDialogOpen: true, dropId })
  }

  closeDialog(dropId) {
    this.setState({ isDialogOpen: false, dropId: null })
  }

  deleteDrop() {
    const self = this;
    request
    .del('/api/feeds/'+this.state.dropId)
    .end(function(err,res){
      if(!err)
      self.props.fetchAllMyDrops(self.props.user.userId);
      self.setState({isDialogOpen: false, dropId: null});
    })
  }

  componentWillMount() {
    if(!this.props.user) {
      this.props.passSnackbarMessage('Log in to view profile')
      browserHistory.push('/login');
    }else{
      const userId = this.props.params.profileId ? this.props.params.profileId : this.props.user.userId;

      request
      .get(`/api/users/${userId}`)
      .end((err,res) => this.setState({ userInfo: res.body }));

      this.props.fetchAllMyDrops(userId);
      this.props.fetchAllMyComments(userId);
      this.props.fetchAllMyVotes(userId);
    }
  }

	render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.closeDialog} />,
      <FlatButton label="Delete" primary={true} onTouchTap={this.deleteDrop} />,
    ];
    const { profile : { drops, comments } } = this.props;
    const { userInfo } = this.state;

		return (
      <div>
      <Dialog actions={actions} modal={false} open={this.state.isDialogOpen} onRequestClose={this.closeDialog}>
        Delete the message forever?
      </Dialog>

      {userInfo ? <div>
      <div className="row center-xs profile-container">
        <div className="col-xs-12 profile-pic">
          <Avatar
            src={userInfo.user_avatar_url}
            size={100}
          />
        </div>
        <div className="col-xs-12 profile-fb">
          <h2>{userInfo.user_name}</h2>
          <a target="_window" href={fb.msgUrl(userInfo.facebook_id)}>Message on Facebook</a>
        </div>
        <div className="col-xs-12 ">
          <div className="row center-xs">
            <div className="col-xs-3 profile-stat"><p>{drops.length || 0 }</p><small>{text.pluralizer('drop', drops.length)}</small></div>
            <div className="col-xs-3 profile-stat"><p>{comments.length || 0 }</p><small>{text.pluralizer('comment', comments.length)}</small></div>
          </div>
        </div>
      </div>
      <div className="row center-xs">
        <div className="col-xs-12 ">
        <Tabs>
          <Tab label="Top Drops" >
            <List
              feed={this.props.profile.drops}
              isProfile={true}
              dropSrc={"profile"}
              selectedDropIdx={this.props.selectedDropIdx}
              selectedDropSrc={this.props.selectedDropSrc}
              fetchCommentsForDrop={this.props.fetchCommentsForDrop}
              openDialog={this.openDialog}
              user={this.props.user}
            />
          </Tab>
          <Tab label="Recent Comments" >
            <CommentsList comments={this.props.profile.comments} isProfile={true}/>
          </Tab>
        </Tabs>
        </div>

      </div>
      </div>
      : <CircularProgress className="no-drops"/>
      }
      </div>
		)
	}
}

ProfilePageComponent.PropTypes = {
  fetchAllMyDrops: PropTypes.func.isRequired,
  fetchAllMyComments: PropTypes.func.isRequired,
  fetchAllMyVotes: PropTypes.func.isRequired,
  passSnackbarMessage: PropTypes.func.isRequired,
  passingFromOthersToDrop: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

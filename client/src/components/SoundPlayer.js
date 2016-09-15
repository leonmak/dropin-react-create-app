import React from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, Progress } from 'react-soundplayer/components';

import '../styles/soundcloud-styles/buttons.css';
import '../styles/soundcloud-styles/icons.css'
import '../styles/soundcloud-styles/progress.css'
import '../styles/soundcloud-styles/player.css'

class Player extends React.Component {
  render() {
    let { track, currentTime, duration } = this.props;

    return (
      <div className="row center-xs middle-xs soundcloud-player">
        <div className="col-xs-2">
          <PlayButton className="play-btn" {...this.props} />
        </div>
        <div className="col-xs-10">
          <h4 className="soundcloud-track">{track ? track.title : ''}</h4>
          <h4 className="soundcloud-username">{track ? track.user.username : ''}</h4>
          <Progress className="" innerClassName="rounded-left"
            value={(currentTime / duration) * 100 || 0}
            {...this.props}
          />
        </div>
      </div>
      );
  }
}


const SoundPlayer = props => (
  <SoundPlayerContainer resolveUrl={props.resolveUrl} clientId={process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID}>
    <Player />
  </SoundPlayerContainer>
)

export default SoundPlayer;

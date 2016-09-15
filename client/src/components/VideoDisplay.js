import React from 'react';
import Video from 'react-video';

const VideoDisplay = props => {
  let video_id = props.url.split('v=')[1];
  let ampersandPosition = video_id.indexOf('&');
  if(ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  return (
    <Video videoId={video_id}/>
  )
}

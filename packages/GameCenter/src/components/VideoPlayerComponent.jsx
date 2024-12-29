import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({
  uri = '',
  style = {},
  resizeMode = 'contain',
  muted = true,
  repeat = true,
  onError = (e) => console.error(e),
  width = '100%', // Default width if not provided
  height = '100%', // Default height if not provided
}) => {
  const videoRef = useRef(null); // Create a reference

  return (
    <>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={[styles.video, { width, height }]} // Apply width and height props
        resizeMode={resizeMode}
        muted={muted}
        repeat={repeat}
        onError={onError}
        disableFocus={true}

      />
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
      },
  video: {
  },
});

export default VideoPlayer;

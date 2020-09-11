import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InteractiveTranscripts from 'react-native-interactive-transcripts';
import Video from 'react-native-video';

export default function App() {
  let [duration, updateDuration] = useState(0);
  const progressCallback = (data: any) => {
    updateDuration(data.currentTime * 1000);
  };
  return (
    <View style={styles.container}>
      <Video
        style={{ width: '100%', height: '30%' }}
        source={{
          uri:
            'https://thepaciellogroup.github.io/AT-browser-tests/video/ElephantsDream.mp4',
        }} // Can be a URL or a local file.
        onProgress={progressCallback}
      />
      <InteractiveTranscripts
        currentDuration={duration}
        url={
          'https://thepaciellogroup.github.io/AT-browser-tests/video/subtitles-en.vtt'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});

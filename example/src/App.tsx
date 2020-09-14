/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import InteractiveTranscripts from 'react-native-interactive-transcripts';
import Video from 'react-native-video';

export default function App() {
  let player: any = useRef<Video>(null);

  let [duration, updateDuration] = useState(0);
  const progressCallback = (data: any) => {
    updateDuration(data.currentTime * 1000);
  };
  return (
    <View style={styles.container}>
      <Video
        ref={(ref) => {
          player = ref;
        }}
        style={{ width: '100%', height: '30%', backgroundColor: 'skyblue' }}
        source={{
          uri:
            'https://html5multimedia.com/code/media/elephants-dream-medium.mp4',
        }} // Can be a URL or a local file.
        onProgress={progressCallback}
      />
      <InteractiveTranscripts
        currentDuration={duration}
        url={
          'https://html5multimedia.com/code/ch8/elephants-dream-subtitles-en.vtt'
        }
        seekToTranscriptDuration={(time) => {
          player.seek(time);
        }}
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

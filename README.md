[![npm version](https://badge.fury.io/js/react-native-interactive-transcripts.svg)](https://badge.fury.io/js/react-native-interactive-transcripts)

# react-native-interactive-transcripts 

Interactive Transcripts support in the react native.
Supports (WEBVTT) , as of now
(Work in progress)

## Installation

```sh
npm install react-native-interactive-transcripts
```

or 

```sh
yarn add react-native-interactive-transcripts
```

## Input Props
| Prop  | type  | Description |
| :------------ |:---------------:| :---------------:|
| currentDuration | number (required) | Pass in the current duration of the Video |
| url | String (required) | Url of the VTT file |
|textStyle | styleObject (optional) | Style for the Text in transcript|
|textContainerStyle | styleObject (optional) | Style for the Text Container|
|contentContainerStyle | styleObject (optional) | Style for the Content(list)|
|activeTranscriptColor | string (optional) | active Transcript color|
|inactiveTranscriptColor| string (optional) | inactive Transcript color|

## Callback
| callBack  | return  | Description |
| :------------ |:---------------:| :---------------:|
| seekToTranscriptDuration | number | Using this is callback value, seek your player to the particular transcript duration |


## Usage

You can use the Transcripts with any player,example below is using - [react-native-video](https://github.com/react-native-community/react-native-video)

```js
import InteractiveTranscripts from "react-native-interactive-transcripts";

// ...

<View style={styles.container}>
      <Video
        ref={(ref) => {
          player = ref; // player ref
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
          player.seek(time); // seek to the clicked transcrpit start duration .
        }}
      />
    </View>
>

```

## Demo 


![Alt DEMO](https://github.com/tejachundru/react-native-interactive-transcripts/blob/media/example/transcript.gif?raw=true)



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

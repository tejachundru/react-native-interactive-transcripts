# react-native-interactive-transcripts

Interactive Transcripts support in the react native.
Supports (WEBVTT) , as of now
(Work in progress)

## Installation

```sh
npm install react-native-interactive-transcripts
```

## Input Props
| Prop  | type  | Description |
| :------------ |:---------------:| :---------------:|
| currentDuration | number | Pass in the current duration of the Video |
| url | String | Url of the VTT file |

## Callback
| callBack  | return  | Description |
| :------------ |:---------------:| :---------------:|
| seekToStartDurationOnClick | number | Using this is callback value, seek your player to the particular transcript duration |


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
        seekToStartDurationOnClick={(time) => { 
          player.seek(time); // seek to the clicked transcrpit start duration .
        }}
      />
    </View>
>

```

##Demo 


![Alt DEMO](https://github.com/tejachundru/react-native-interactive-transcripts/blob/media/example/transcript.gif?raw=true)



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import WebVttParser from './VTTtoJsonParser.js';

interface InteractiveTranscriptsProps {
  currentDuration: number;
  url: string;
  seekToTranscriptDuration: (p: number) => void;
  textStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  activeTranscriptColor?: string;
  inactiveTranscriptColor?: string;
}

const InteractiveTranscripts = ({
  currentDuration = 0,
  url = '',
  seekToTranscriptDuration = () => {},
  textStyle = {},
  textContainerStyle = { margin: 5 },
  contentContainerStyle = {},
  activeTranscriptColor = 'blue',
  inactiveTranscriptColor = 'black',
}: InteractiveTranscriptsProps) => {
  const [cueArray, setCueArray] = useState<any[]>([]);
  const [selectedIndex, changeSelectedIndex] = useState(-1);
  let flatlistRef: any = useRef<FlatList>(null);

  useEffect(() => {
    cueArray.length === 0 &&
      fetch(url)
        .then((response) => response.text())
        .then((text) => {
          let output = WebVttParser(text);
          setCueArray(output);
        });
    if (cueArray.length > 0) {
      let cueval = cueTextAndIndex(cueArray, currentDuration);
      changeSelectedIndex(cueval.cueindex);
      if (cueval.cueindex >= 0 && selectedIndex !== cueval.cueindex) {
        flatlistRef.scrollToIndex({
          animated: true,
          index: cueval.cueindex,
          viewPosition: 0.3,
        });
      }
    }
  }, [url, currentDuration, cueArray, selectedIndex]);

  /**
   * To find the CC current text to display
   */
  const cueTextAndIndex = (array: any, value: number) => {
    let low = 0,
      high = array.length - 1;
    while (low < high) {
      var mid = (low + high) >>> 1;
      if (array[mid].startTime <= value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    low = low - 1;
    if (low < 0) {
      return { cuetext: '', cueindex: -1 };
    }
    return {
      cuetext: array[low].endTime >= value ? array[low].text : '',
      cueindex: array[low].endTime >= value ? array[low].sequence : -1,
    };
  };

  return (
    <>
      {cueArray !== null && (
        <FlatList
          ref={(ref) => {
            flatlistRef = ref;
          }}
          contentContainerStyle={contentContainerStyle}
          data={cueArray}
          keyExtractor={(item) => `${item.startTime}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[textContainerStyle]}
                onPress={() => {
                  seekToTranscriptDuration(item.startTime / 1000);
                }}
              >
                {selectedIndex === index ? (
                  <Text style={[{ color: activeTranscriptColor }, textStyle]}>
                    {item.text}
                  </Text>
                ) : (
                  <Text style={[{ color: inactiveTranscriptColor }, textStyle]}>
                    {item.text}
                  </Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  );
};

export default InteractiveTranscripts;

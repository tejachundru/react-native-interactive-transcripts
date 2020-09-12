/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import WebVttParser from './VTTtoJsonParser.js';

interface InteractiveTranscriptsProps {
  currentDuration: number;
  url: string;
  seekToStartDurationOnClick: (p: number) => void;
}

export default ({
  currentDuration,
  url,
  seekToStartDurationOnClick,
}: InteractiveTranscriptsProps) => {
  const [cueArray, setCueArray] = useState<any[]>([]);
  const [selectedIndex, ChangeSelectedIndex] = useState(-1);

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
      ChangeSelectedIndex(cueval.cueindex);
    }
  }, [url, currentDuration, cueArray]);

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
          //contentContainerStyle={{ backgroundColor: 'red' }}
          data={cueArray}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{ margin: 5 }}
                onPress={() => {
                  seekToStartDurationOnClick(cueArray[index].startTime / 1000);
                }}
              >
                {selectedIndex === index ? (
                  <Text style={{ color: 'blue' }}>{item.text}</Text>
                ) : (
                  <Text>{item.text}</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  );
};

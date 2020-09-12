function timeValuesToMilliseconds({
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}) {
  return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
}

function splitTimeStamp(timeStamp) {
  const [hours, minutes, secondsAndMilliseconds = ''] = timeStamp.split(':');
  const millisecondSeparator = secondsAndMilliseconds.includes(',')
    ? ','
    : secondsAndMilliseconds.includes('.')
    ? '.'
    : '';
  if (millisecondSeparator === '') {
    //error ('Unable to process timestamp');
  }
  const [seconds, milliseconds] = secondsAndMilliseconds.split(
    millisecondSeparator
  );
  return {
    hours: Number(hours),
    minutes: Number(minutes),
    seconds: Number(seconds),
    milliseconds: Number(milliseconds),
  };
}

function parseTimeStamps(string, marker) {
  const [startTimeRaw, endTimeRaw] = string.split(marker);
  if (!endTimeRaw) {
    return;
  }
  const startTimeValues = splitTimeStamp(startTimeRaw);
  const endTimeValues = splitTimeStamp(endTimeRaw);
  return {
    startTime: timeValuesToMilliseconds(startTimeValues),
    endTime: timeValuesToMilliseconds(endTimeValues),
  };
}

function dropEmptyArrayBlocks(arrayBlocks) {
  return arrayBlocks.filter((arrayBlock) => arrayBlock.length);
}

function processArrayToArrayBlocks(array) {
  return array.reduce(
    (blockArray, currentLine) => {
      if (currentLine === '') {
        blockArray.push([]);
      } else {
        blockArray[blockArray.length - 1].push(currentLine);
      }
      return blockArray;
    },
    [[]]
  );
}

function dropNonCueData(rawCueData) {
  return rawCueData.filter((cueData, index) => {
    const [header] = cueData;
    return !(
      header.startsWith('WEBVTT') ||
      header.startsWith('NOTE') ||
      header.startsWith('STYLE')
    );
  });
}

function processArrayBlocksToCues(arrayBlocks) {
  return arrayBlocks.map((block, blockIndex) => {
    const processedCue =
      block &&
      block.reduce(
        (cue, string, index) => {
          // Ignore cue identifier
          if (index === 0 && !string.includes('-->')) {
            return cue;
          }
          if (!cue.endTime && string.includes('-->')) {
            const timeStamps = parseTimeStamps(string, '-->');
            if (timeStamps) {
              cue.startTime = timeStamps.startTime;
              cue.endTime = timeStamps.endTime;
            }
            return cue;
          }
          cue.text = cue.text + string;
          return cue;
        },
        {
          sequence: blockIndex,
          startTime: 0,
          endTime: 0,
          text: '',
        }
      );
    // if (processedCue.endTime <= processedCue.startTime) {
    // throw new ParserError('Invalid Cue: Timecodes not valid');
    // }
    return processedCue;
  });
}

export default function WebVttParser(string) {
  const lineArray = string.split(/\r?\n/);
  const allRawCueData = processArrayToArrayBlocks(lineArray);
  const rawCueData = dropEmptyArrayBlocks(allRawCueData);
  const filteredCueData = dropNonCueData(rawCueData);
  return processArrayBlocksToCues(filteredCueData);
}

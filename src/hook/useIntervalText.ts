import { useEffect, useRef, useState } from 'react';

interface IUseIntervalText {
  names: string[];
  time: number;
}

const useIntervalText = (props: IUseIntervalText) => {
  const [word, setWord] = useState({ word: '', index: 0, arrIndex: 0 });

  const direction = useRef('forward');
  useEffect(() => {
    const interval = setInterval(() => {
      //check direction
      if (direction.current === 'forward') {
        //check if the word is finished
        if (word.index === props.names[word.arrIndex].length) {
          direction.current = 'backward';
        } else {
          //add the next letter
          setWord((prev) => ({
            ...prev,
            word: prev.word + props.names[word.arrIndex][word.index],
            index: prev.index + 1
          }));
        }
      } else {
        //check if the word is finished
        if (word.index === 0) {
          direction.current = 'forward';
          setWord((prev) => ({
            ...prev,
            arrIndex: (prev.arrIndex + 1) % props.names.length
          }));
        } else {
          //remove the last letter
          setWord((prev) => ({
            ...prev,
            word: prev.word.slice(0, prev.word.length - 1),
            index: prev.index - 1
          }));
        }
      }
    }, props.time);

    return () => clearInterval(interval);
  }, [word]);

  return word.word;
};

export default useIntervalText;

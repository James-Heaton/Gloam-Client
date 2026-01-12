import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Reset when text changes
  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (isComplete) return;

    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else if (displayText.length === text.length) {
      setIsComplete(true);
    }
  }, [displayText, text, speed, isComplete]);

  const skip = () => {
    setIsComplete(true);
    setDisplayText(text);
  };

  return { displayText, isComplete, skip };
};

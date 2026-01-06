import { useState, useEffect } from "react";

export const useTypewriter = (text, speed = 50) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else {
            setIsComplete(true);
        }
    }, [currentIndex, text, speed]);

    const skip = () => {
        setDisplayText(text);
        setCurrentIndex(text.length);
        setIsComplete(true);
    }

    return { displayText, isComplete, skip };
};

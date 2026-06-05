"use client";

import { useEffect, useState } from "react";

export default function TypingAnimation() {
  const [text, setText] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const words = [
      "Web Developer",
      "Programmer",
      "Designer",
      "Freelancer",
      "Engineer",
    ];
    const typingSpeed = 150;
    const erasingSpeed = 100;
    const delayBetweenWords = 1000;

    const handleTyping = () => {
      if (!isErasing) {
        if (charIndex < words[wordIndex].length) {
          setText((prevText) => prevText + words[wordIndex][charIndex]);
          setCharIndex((prevCharIndex) => prevCharIndex + 1);
        } else {
          setIsErasing(true);
        }
      } else {
        if (charIndex > 0) {
          setText((prevText) => prevText.slice(0, -1));
          setCharIndex((prevCharIndex) => prevCharIndex - 1);
        } else {
          setIsErasing(false);
          setWordIndex((prevWordIndex) => (prevWordIndex + 1) % words.length);
        }
      }
    };

    const typingDelay = isErasing ? erasingSpeed : typingSpeed;
    const timer =
      charIndex >= words[wordIndex].length
        ? setTimeout(handleTyping, delayBetweenWords)
        : setTimeout(handleTyping, typingDelay);

    return () => clearTimeout(timer);
  }, [charIndex, isErasing, wordIndex]);

  return (
    <div className="text-2xl md:text-3xl text-blue-600 font-semibold inline-block ml-2">
      <span aria-live="polite">{text}</span>
      <span className="animate-pulse ml-1 text-zinc-800 dark:text-zinc-200">
        |
      </span>
    </div>
  );
}

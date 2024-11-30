import React, { useState, useEffect, useCallback } from "react";

const RapidRandomWordGenerator = () => {
  const phrases = [
    "Creativity sparks innovation",
    "Imagination transforms reality",
    "Dreams become achievements",
    "Ideas shape tomorrow",
    "Knowledge empowers growth",
    "Passion drives success",
    "Vision creates future",
    "Purpose finds meaning"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentWords, setCurrentWords] = useState([]);
  const [revealedWords, setRevealedWords] = useState([]);
  const [isRandomizing, setIsRandomizing] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Extended character set for more interesting randomization
  const randomChars = 
    ".,!?:;'\"()[]{}/\\|~@#$%^&*_+=- <>.,©®™°§" +
    "+-×÷=≠><±∞√∑∏πΩ∆∂∫≈≤≥" +
    "$€£¥₹¢₿" +
    "αβγδεζηθικλμνξοπρστυφχψω" +
    "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";

  const generateRandomWord = useCallback((word) => {
    return word
      .split("")
      .map(() => randomChars[Math.floor(Math.random() * randomChars.length)])
      .join("");
  }, []);

  const resetAnimation = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      setCurrentWords([]);
      setRevealedWords([]);
      setIsRandomizing(true);
      setIsVisible(true);
    }, 300);
  }, [phrases.length]);

  useEffect(() => {
    if (currentPhraseIndex >= phrases.length) {
      setCurrentPhraseIndex(0);
      return;
    }

    const currentPhrase = phrases[currentPhraseIndex];
    const words = currentPhrase.split(" ");

    if (isRandomizing) {
      const randomInterval = setInterval(() => {
        setCurrentWords(words.map(generateRandomWord));
      }, 35);

      const stopRandomizationTimer = setTimeout(() => {
        clearInterval(randomInterval);
        setIsRandomizing(false);
        setCurrentWords(words.map(generateRandomWord));
      }, 600);

      return () => {
        clearInterval(randomInterval);
        clearTimeout(stopRandomizationTimer);
      };
    } else {
      const revealInterval = setInterval(() => {
        setRevealedWords((prev) => {
          const newRevealedWords = [...prev];
          const nextIndex = prev.length;

          if (nextIndex >= words.length) {
            clearInterval(revealInterval);
            setTimeout(resetAnimation, 1500);
            return prev;
          }

          newRevealedWords[nextIndex] = words[nextIndex];
          return newRevealedWords;
        });
      }, 150);

      return () => clearInterval(revealInterval);
    }
  }, [currentPhraseIndex, isRandomizing, generateRandomWord, resetAnimation, phrases.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div 
        className={`transform transition-all duration-300 ease-in-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-4xl md:text-5xl lg:text-6xl text-center font-mono tracking-wide">
          {currentWords.map((randomWord, index) => (
            <span
              key={index}
              className="inline-block mr-2 mb-2"
              style={{
                color: revealedWords[index] ? '#ffffff' : '#666666',
                textShadow: revealedWords[index] ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {revealedWords[index] || randomWord}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 text-gray-500 text-sm">
        {currentPhraseIndex + 1} / {phrases.length}
      </div>
    </div>
  );
};

export default RapidRandomWordGenerator;
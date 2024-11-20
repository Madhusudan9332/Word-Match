import React, { useState, useEffect } from "react";

const Main = ({ wordMatchObj , getRandomObject}) => {

  if (!wordMatchObj) {
    return <div>Loading...</div>; // Or handle gracefully with a placeholder UI
  }

  const { wordsA, wordsB } = wordMatchObj;
  const allWords = [...wordsA, ...wordsB];

  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [pairWord, setPairWord] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [count, setCount] = useState(0);

  // Shuffle words on component mount or restart
  useEffect(() => {
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setMatchedPairs([]);
    setSelectedWord(null);
    setPairWord(null);
    setCount(0);
  }, []);

  // Handle word click
  const handleWordClick = (word) => {
    // If the same word is clicked again, clear the selection
    if (selectedWord === word) {
      setSelectedWord(null);
      return;
    }

    // If no word is selected, select the current word
    if (!selectedWord) {
      setSelectedWord(word);
      return;
    }

    // If a second word is clicked, set it as the pair
    setPairWord(word);
    setCount((prevCount) => prevCount + 1);
  };

  // Check for pair match
  useEffect(() => {
    if (!selectedWord || !pairWord) return;

    const isMatch =
      (wordsA.includes(selectedWord) &&
        wordsB.includes(pairWord) &&
        wordsA.indexOf(selectedWord) === wordsB.indexOf(pairWord)) ||
      (wordsB.includes(selectedWord) &&
        wordsA.includes(pairWord) &&
        wordsB.indexOf(selectedWord) === wordsA.indexOf(pairWord));

    if (isMatch) {
      setMatchedPairs((prev) => [...prev, selectedWord, pairWord]);

      // Clear the selection after 1 second
      setTimeout(() => {
        setSelectedWord(null);
        setPairWord(null);

        // Remove matched words from grid
        setShuffledWords((prevWords) =>
          prevWords.filter((word) => word !== selectedWord && word !== pairWord)
        );
      }, 1000);
    } else {
      // Reset selection for incorrect match after 1 second
      setTimeout(() => {
        setSelectedWord(null);
        setPairWord(null);
      }, 1000);
    }
  }, [selectedWord, pairWord, wordsA, wordsB]);

  // Restart game
  const handleRestart = () => {
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    getRandomObject();
    setShuffledWords(shuffled);
    setMatchedPairs([]);
    setSelectedWord(null);
    setPairWord(null);
    setCount(0);
  };

  return (
    <div className="p-6">
      {/* Word Grid */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {shuffledWords.map((word, index) => {
          const isMatched = matchedPairs.includes(word);
          const isSelected = word === selectedWord || word === pairWord;

          return (
            <div
              key={index}
              onClick={() => !isMatched && handleWordClick(word)}
              className={`p-4 text-center rounded cursor-pointer 
                ${
                  isSelected
                    ? pairWord
                      ? isMatched
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }
              `}
              style={{ transition: "background-color 0.3s, color 0.3s" }}
            >
              {word}
            </div>
          );
        })}
      </div>

      {/* Step Counter */}
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">Steps Taken: {count}</p>
      </div>

      {/* Restart Button */}
      <div className="text-center">
        <button
          onClick={handleRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Main;

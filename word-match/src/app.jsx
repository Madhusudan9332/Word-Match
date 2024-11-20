import "./app.css";
import wordMatchObjects from "./word_match_objects.json";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Help from "./components/Help";

export function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [randomObject, setRandomObject] = useState(null);
  const [index, setIndex] = useState(0);

  const getRandomObject = () => {
    const randomIndex = Math.floor(Math.random() * wordMatchObjects.length);
    setIndex(randomIndex);
  };

  useEffect(() => {
    setRandomObject(wordMatchObjects[index]);
    setTimeout(() => {
      console.log(randomObject);
    }, 1000);
  }, [index]);

  useEffect(() => {
    setRandomObject(wordMatchObjects[0]);
    setTimeout(() => {
      console.log(randomObject);
    }, 1000);
  }, []);
  return (
    <>
      <Header onHelpClick={() => setIsHelpOpen(true)} />
      <Help isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <Main wordMatchObj={randomObject} getRandomObject={getRandomObject} />
    </>
  );
}

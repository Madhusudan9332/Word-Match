import "./app.css";
import wordMatchObjects from "./word_match_objects.json";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Help from "./components/Help";

export function App() {
  const [randomObject, setRandomObject] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const getRandomObject = () => {
    const randomIndex = Math.floor(Math.random() * wordMatchObjects.length);
    return wordMatchObjects[randomIndex];
  };

  useEffect(() => {
    console.log(randomObject);
    setRandomObject(getRandomObject());
  }, []);

  setRandomObject(getRandomObject());
  return (
    <>
      <Header onHelpClick={() => setIsHelpOpen(true)} />
      <Help isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <Main wordMatchObj={randomObject} />
    </>
  );
}

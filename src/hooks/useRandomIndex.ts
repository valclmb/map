import { useState } from "react";

const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const useRandomIndex = (max: number) => {
  const [randomIndex, setRandomIndex] = useState(getRandomIndex(max));

  const changeIndex = () => {
    setRandomIndex(getRandomIndex(max));
  };

  return { randomIndex, changeIndex };
};

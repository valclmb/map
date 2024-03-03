import { useRef, useState } from "react";
type Value = {
  value: string;
  valid: boolean;
};

type Values = {
  name: Value;
  capital: Value;
};
const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const useMap = (countries: any) => {
  const defaultValues = {
    name: { value: "", valid: false },
    capital: { value: "", valid: false },
  };
  const [currentCountry, setCurrentCountry] = useState<Values>(defaultValues);
  const [randomIndex, setRandomIndex] = useState(
    getRandomIndex(countries.length)
  );
  const [badAnswers, setBadAnswers] = useState<boolean | string>(false);
  const countryRef = useRef<HTMLInputElement>(null);
  const capitalRef = useRef<HTMLInputElement>(null);
  const country = countries[randomIndex]?.properties?.name;
  const capital = countries[randomIndex]?.properties?.capital;

  const changeIndex = (valid = false) => {
    setRandomIndex(getRandomIndex(countries.length));

    setCurrentCountry(defaultValues);

    setTimeout(() => {
      countryRef.current?.focus();
    }, 500);

    if (!valid) {
      setBadAnswers(`La bonne réponse était ${country} - ${capital}`);

      setTimeout(() => {
        setBadAnswers(false);
      }, 2000);
    }
  };

  const handleChange = (event: any) => {
    const target = event.currentTarget;

    const id = target.id;
    const propertieValue =
      countries[randomIndex]?.properties?.[id].toLowerCase();

    setCurrentCountry((curr) => {
      const result = {
        ...curr,
        [id]: {
          value: target.value,
          valid: propertieValue === target.value.toLowerCase(),
        },
      };

      if (id === "name" && result.name.valid) {
        setTimeout(() => {
          capitalRef.current?.focus();
        }, 100);
      }

      if (result.name.valid && result.capital.valid) {
        changeIndex(true);
      }
      return result;
    });
  };

  return {
    randomIndex,
    currentCountry,
    changeIndex,
    handleChange,
    refs: {
      capitalRef,
      countryRef,
    },
    badAnswers,
  };
};

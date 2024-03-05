import { useRef, useState } from "react";
import { toast } from "../components/ui/use-toast";
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
  const countryRef = useRef<HTMLInputElement>(null);
  const capitalRef = useRef<HTMLInputElement>(null);
  const country = countries[randomIndex]?.properties?.name;
  const capital = countries[randomIndex]?.properties?.capital;

  const changeIndex = (valid = false) => {
    setRandomIndex(getRandomIndex(countries.length));

    setCurrentCountry(defaultValues);

    setTimeout(() => {
      countryRef.current?.focus();
    }, 100);

    if (!valid) {
      toast({
        description: `La bonne réponse était ${country} - ${capital}`,
        variant: "destructive",
      });
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
        toast({
          description: `Bravo ! Vous avez trouvé ${country} - ${capital} 🎉🎉🎉`,
        });
        setTimeout(() => {
          changeIndex(true);
        }, 200);
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
  };
};

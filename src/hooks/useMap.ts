import * as d3 from "d3-geo";
import { FeatureCollection } from "geojson";
import { useEffect, useRef, useState } from "react";
type Value = {
  value: string;
  valid: boolean;
};

type Values = {
  country: Value;
  capital: Value;
};
const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const useMap = (width: number, height: number, countries: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const capitalRef = useRef<HTMLInputElement>(null);
  const defaultValues = {
    country: { value: "", valid: false },
    capital: { value: "", valid: false },
  };
  const [currentCountry, setCurrentCountry] = useState<Values>(defaultValues);
  const [randomIndex, setRandomIndex] = useState(
    getRandomIndex(countries.length)
  );

  const changeIndex = () => {
    setRandomIndex(getRandomIndex(countries.length));
  };

  const projection = d3.geoMercator().fitSize([width, height], {
    type: "FeatureCollection",
    features: countries,
  } as FeatureCollection);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) {
      return;
    }
    const geoPathGenerator = d3
      .geoPath()
      .projection(projection)
      .context(context); // if a context is provided, geoPath() understands that we work with canvas, not SVG

    context.clearRect(0, 0, width, height);
    context.beginPath();

    countries.forEach((country: any, key: number) => {
      let countryColor = "black";
      let strokeColor = "white";

      if (randomIndex === key) {
        countryColor = "blue";
      }

      context.beginPath();
      geoPathGenerator(country);

      context.fillStyle = countryColor;
      context.fill();
      context.strokeStyle = strokeColor;

      context.stroke();
    });
  }, [width, height, projection, countries, randomIndex]);

  const handleChange = (event: any) => {
    const target = event.currentTarget;

    const id = target.id;
    const properties = id === "country" ? "name" : "capital";
    const propertieValue =
      countries[randomIndex]?.properties?.[properties].toLowerCase();

    setCurrentCountry((curr) => {
      const result = {
        ...curr,
        [id]: {
          value: target.value,
          valid: propertieValue === target.value.toLowerCase(),
        },
      };
      if (id === "country" && result.country.valid) {
        setTimeout(() => {
          capitalRef.current?.focus();
        }, 100);
      }
      if (result.country.valid && result.capital.valid) {
        setTimeout(() => {
          changeIndex();
          setCurrentCountry(defaultValues);

          countryRef.current?.focus();
        }, 200);
      }
      return result;
    });
  };

  return {
    canvasRef,
    countryRef,
    capitalRef,
    handleChange,
    randomIndex,
    country: currentCountry.country,
    capital: currentCountry.capital,
    changeIndex,
  };
};

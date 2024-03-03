"use client";

import { useMap } from "@/src/hooks/useMap";
import { useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Form } from "../Form/Form";

type MapProps = {
  data: any;
};

export const Map = ({ data }: MapProps) => {
  const {
    randomIndex,
    changeIndex,
    currentCountry,
    handleChange,
    refs,
    badAnswers,
  } = useMap(data.features);

  const country = data.features[randomIndex]?.properties.name;
  const capital = data.features[randomIndex]?.properties.capital;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && e.ctrlKey) {
        changeIndex();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeIndex]);
  console.log(data);

  return (
    <>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
        <Geographies geography={data} stroke="#FFFFFF">
          {({ geographies }) =>
            geographies.map((geo, key) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                strokeWidth={0.5}
                style={{
                  default: {
                    fill: key === randomIndex ? "red" : "black",
                    // outline: "1px solidwhite",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <Form
        currentCountry={currentCountry}
        handleChange={handleChange}
        refs={refs}
      />
      {badAnswers ? (
        <div className="absolute right-1/2 translate-x-1/2 bottom-2 rounded-sm  bg-red-100 border border-red-500 p-2">
          {badAnswers}
        </div>
      ) : null}
    </>
  );
};

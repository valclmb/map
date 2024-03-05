"use client";

import { useMap } from "@/src/hooks/useMap";
import { useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Form } from "../Form/Form";

type MapProps = {
  data: any;
};

export const Map = ({ data }: MapProps) => {
  const { randomIndex, changeIndex, currentCountry, handleChange, refs } =
    useMap(data.features);

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

  return (
    <>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 105 }}>
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
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <Form
        changeIndex={changeIndex}
        currentCountry={currentCountry}
        handleChange={handleChange}
        refs={refs}
      />
    </>
  );
};

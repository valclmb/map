"use client";
import { useMap } from "@/src/hooks/useMap";
import { useRandomIndex } from "@/src/hooks/useRandomIndex";
import { GeoJsonProperties } from "geojson";
import { useState } from "react";

type MapProps = {
  width: number;
  height: number;
  countries: GeoJsonProperties[];
};

export const Map = ({ width, height, countries }: MapProps) => {
  const [country, setCountry] = useState<string>("");
  const { randomIndex, changeIndex } = useRandomIndex(countries.length);

  const canvasRef = useMap(width, height, countries, randomIndex);

  const handleChange = (event: any) => {
    const target = event.currentTarget;

    setCountry(target.value);

    if (
      target.value.toLowerCase() ===
      countries[randomIndex]?.properties?.name.toLowerCase()
    ) {
      setTimeout(() => {
        setCountry("");
        changeIndex();
      }, 200);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && country === "") {
      changeIndex();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />

      <div className="bg-black/80 p-5 text-white rounded-md w-96 m-auto backdrop-blur-md space-y-3">
        <div className="flex flex-col">
          <label htmlFor="country">Pays</label>
          <input
            autoFocus
            id="country"
            type="text"
            className="p-1 text-black"
            value={country}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button onClick={changeIndex}>Je sais pas</button>
      </div>
    </div>
  );
};

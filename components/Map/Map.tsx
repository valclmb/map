"use client";
import * as d3 from "d3-geo";
import { FeatureCollection } from "geojson";
import { useEffect, useRef, useState } from "react";

type MapProps = {
  width: number;
  height: number;
  data: FeatureCollection;
};

const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const Map = ({ width, height, data }: MapProps) => {
  const [country, setCountry] = useState<string>("");
  // const [capital, setCapital] = useState<string>("");
  const countryLength = data.features.length;
  const [randomIndex, setRandomIndex] = useState<number>(
    getRandomIndex(countryLength)
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const projection = d3.geoMercator().fitSize([width, height], data);

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

    data.features.forEach((feature: any, key) => {
      let countryColor = "black";

      if (randomIndex === key) {
        countryColor = "red";
      }

      context.beginPath();
      geoPathGenerator(feature);
      context.fillStyle = countryColor;
      context.fill();
      context.strokeStyle = "white";
      context.stroke();
    });
  }, [width, height, projection, data, randomIndex]);

  const handleChange = (event: any) => {
    const target = event.currentTarget;

    setCountry(target.value);

    if (
      target.value.toLowerCase() ===
      data.features[randomIndex]?.properties?.name_fr.toLowerCase()
    ) {
      setTimeout(() => {
        setCountry("");
        setRandomIndex(getRandomIndex(countryLength));
      }, 200);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />

      <div className="bg-black/80 p-5 text-white rounded-md w-96 m-auto backdrop-blur-md space-y-3">
        <div className="flex flex-col">
          <label htmlFor="country">Pays</label>
          <input
            id="country"
            type="text"
            className="p-1 text-black"
            value={country}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={() => {
            setRandomIndex(getRandomIndex(countryLength));
          }}
        >
          Je sais pas
        </button>
      </div>
    </div>
  );
};

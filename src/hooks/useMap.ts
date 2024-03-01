import * as d3 from "d3-geo";
import { FeatureCollection } from "geojson";
import { useEffect, useRef } from "react";

export const useMap = (
  width: number,
  height: number,
  countries: any,
  randomIndex: number
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      if (randomIndex === key) {
        countryColor = "red";
      }

      context.beginPath();
      geoPathGenerator(country);
      context.fillStyle = countryColor;
      context.fill();
      context.strokeStyle = "white";
      context.stroke();
    });
  }, [width, height, projection, countries, randomIndex]);

  return canvasRef;
};

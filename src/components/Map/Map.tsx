"use client";
import { useMap } from "@/src/hooks/useMap";
import { GeoJsonProperties } from "geojson";
import { Delete } from "lucide-react";
import { useEffect } from "react";

type MapProps = {
  width: number;
  height: number;
  countries: GeoJsonProperties[];
};

export const Map = ({ width, height, countries }: MapProps) => {
  const {
    canvasRef,
    countryRef,
    capitalRef,
    handleChange,
    country,
    capital,
    changeIndex,
  } = useMap(width, height, countries);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Backspace") {
        changeIndex();
      }
    });
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && values[event.target.id].value === "") {
      changeIndex();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />

      <section className="m-auto bg-black text-white rounded-md p-5 w-96">
        <div className="flex flex-col">
          <label htmlFor="country">Pays</label>
          <input
            autoFocus
            ref={countryRef}
            disabled={country.valid}
            id="country"
            type="text"
            className="p-1 text-black rounded-sm disabled:bg-green-300"
            value={country.value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="capital">Capitale</label>
          <input
            ref={capitalRef}
            disabled={capital.valid}
            id="capital"
            type="text"
            className="p-1 text-black rounded-sm disabled:bg-green-300"
            value={capital.value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <p className="flex gap-2 mt-2 justify-center">
          <Delete strokeWidth={1.5} /> Passer au pays suivant
        </p>
      </section>
    </div>
  );
};

"use client";
import { Filter } from "@/src/components/Filter/Filter";
import { Map } from "@/src/components/Map/Map";
import { GeoJsonProperties } from "geojson";
import { useEffect, useState } from "react";
import { getCountries } from "./lib/data";

export default function Home() {
  const [countries, setCountries] = useState<GeoJsonProperties[]>([]);
  const [filter, setFilter] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const countries = await getCountries(filter);
      setCountries(countries);
    };

    fetchData();
  }, [filter]);

  const data = {
    type: "FeatureCollection",
    features: countries,
  };

  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-10">
      <Map data={data} />
      <Filter filter={filter} setFilter={setFilter} />
    </main>
  );
}

"use client";
import { Filter } from "@/src/components/Filter/Filter";
import { Map } from "@/src/components/Map/Map";
import { GeoJsonProperties } from "geojson";
import { useEffect, useState } from "react";
import { getCountries } from "./lib/data";

export default function Home() {
  const [countries, setCountries] = useState<GeoJsonProperties[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<
    GeoJsonProperties[]
  >([]);
  const [filter, setFilter] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const countries = await getCountries();
      setCountries(countries);
      setFilteredCountries(countries);
    })();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        (country) => !filter.includes(country?.properties.continent)
      )
    );
  }, [filter, countries]);

  const data = {
    type: "FeatureCollection",
    features: filteredCountries,
  };

  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-10">
      <Map data={data} />
      <Filter filter={filter} setFilter={setFilter} />
    </main>
  );
}

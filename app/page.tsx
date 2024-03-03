import { Map } from "@/src/components/Map/Map";
import { GeoJsonProperties } from "geojson";
import { getCountries } from "./lib/data";

export default async function Home() {
  const countries: GeoJsonProperties[] = await getCountries();

  const data = {
    type: "FeatureCollection",
    features: countries,
  };

  return (
    <main className="flex  max-h-screen flex-col items-center justify-between p-10">
      <Map data={data} />
    </main>
  );
}

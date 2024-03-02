import { Map } from "@/src/components/Map/Map";
import { GeoJsonProperties } from "geojson";
import { getCountries } from "./lib/data";

export default async function Home() {
  const countries: GeoJsonProperties[] = await getCountries();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <Map width={1100} height={600} countries={countries} />
    </main>
  );
}

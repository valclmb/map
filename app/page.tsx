import { Map } from "@/src/components/Map/Map";
import { GeoJsonProperties } from "geojson";
import { getCountries } from "./data";

export default async function Home() {
  const countries: GeoJsonProperties[] = await getCountries();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Map width={1200} height={700} countries={countries} />
    </main>
  );
}

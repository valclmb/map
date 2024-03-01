import { Map } from "@/components/Map/Map";
import { FeatureCollection } from "geojson";
import { getMap } from "./data";

export default async function Home() {
  const map: FeatureCollection = await getMap();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Map width={1200} height={750} data={map} />
    </main>
  );
}

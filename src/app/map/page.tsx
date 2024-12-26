import { Suspense } from "react";
import MapPage from "../../components/MapPage";

function Loading() {
  return <div>Loading...</div>;
}

export default function Map() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MapPage />
      </Suspense>
    </>
  );
}

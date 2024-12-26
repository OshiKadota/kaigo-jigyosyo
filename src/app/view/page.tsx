import ViewPage from "@/components/ViewPage";
import { Suspense } from "react";
const View = () => {
  return (
    <Suspense>
      <ViewPage />
    </Suspense>
  );
};

export default View;

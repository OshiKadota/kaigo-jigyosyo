import { useRouter } from "next/navigation";

export const useTopPage = () => {
  const router = useRouter();
  const jumpToMapPage = () => {
    return router.push("/map");
  };
  const jumpToListPage = () => {
    return router.push("/list");
  };
  const jumpToAddFacilitytyPage = () => {
    return router.push("/add-facility");
  };
  return {
    jumpToMapPage,
    jumpToListPage,
    jumpToAddFacilitytyPage,
  };
};

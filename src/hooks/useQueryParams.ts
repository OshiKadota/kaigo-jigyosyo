import { FACILITY_MIDDLE_TYPE } from "@/constants/facility.constants";
import { FacilityMiddleType } from "@/types/facility.types";
import {
  usePathname,
  useSearchParams,
  useRouter,
  ReadonlyURLSearchParams,
} from "next/navigation";

export const useQueryParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setQueryParamsBySelectedMiddleType = (
    selectedFacilities: FacilityMiddleType[]
  ) => {
    const params = new URLSearchParams();
    params.set("q", selectedFacilities.join(" "));
    router.push(pathname + "?" + params.toString());
  };

  const getSelectedMiddleTypeByQueryParams = (
    queryParams: ReadonlyURLSearchParams
  ): FacilityMiddleType[] => {
    const params = new URLSearchParams();
    const middleTypeQuery = queryParams.get("q");
    if (!middleTypeQuery) {
      return [FACILITY_MIDDLE_TYPE[0]];
    }
    const middleTypeQueryParamsArray = middleTypeQuery.split(" ").map((val) => {
      return val;
    });
    const selectedMiddleTypeQueryParamsArray = FACILITY_MIDDLE_TYPE.filter(
      (faci) => {
        return middleTypeQueryParamsArray.includes(faci) ? true : false;
      }
    );
    return selectedMiddleTypeQueryParamsArray.length === 0
      ? [FACILITY_MIDDLE_TYPE[0]]
      : selectedMiddleTypeQueryParamsArray;
  };

  return {
    searchParams,
    getSelectedMiddleTypeByQueryParams,
    setQueryParamsBySelectedMiddleType,
  };
};

import {
  SELECTED_FACILITY_MIDDLE_TYPES,
  SELECTED_FACILITY_REFINE_MAJOR_TYPES,
  SELECTED_HOME_CARE_MIDDLE_TYPES,
  SELECTED_MEDICAL_CARE_MIDDLE_TYPES,
} from "@/components/FacilityRefineSearchForm/FacilityRefineSearchForm.constants";
import {
  SelectedHomeCareMiddleTypes,
  SelectedMedicalCareMiddleTypes,
  SelectedFacilityCareMiddleTypes,
  SelectedFacilityRefineMajorType,
} from "@/components/FacilityRefineSearchForm/FacilityRefineSearchForm.type";
import { FACILITY_MIDDLE_TYPE } from "@/constants/facility.constants";
import { FacilityMiddleType } from "@/types/facility.types";
import {
  usePathname,
  useSearchParams,
  useRouter,
  ReadonlyURLSearchParams,
} from "next/navigation";

export const useFacilityRefineQueryParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setQueryParamsBySelectedMiddleType = (
    selectedMajorFacilities: SelectedFacilityRefineMajorType,
    selectedMiddleFacilities:
      | SelectedHomeCareMiddleTypes[]
      | SelectedMedicalCareMiddleTypes[]
      | SelectedFacilityCareMiddleTypes[]
  ) => {
    if (selectedMajorFacilities === "ALL") {
      return router.push(pathname);
    }
    const params = new URLSearchParams();
    params.set("major_query", selectedMajorFacilities);
    params.set("middle_query", selectedMiddleFacilities.join(" "));
    router.push(pathname + "?" + params.toString());
  };

  const getSelectedMajorType = (
    queryParams: ReadonlyURLSearchParams
  ): SelectedFacilityRefineMajorType => {
    const middleTypeQuery = queryParams.get("major_query");
    if (middleTypeQuery === null) {
      return "ALL";
    }
    return Object.values(SELECTED_FACILITY_REFINE_MAJOR_TYPES).filter((val) => {
      return val === middleTypeQuery;
    })[0];
  };

  const getSelectedHomeCareMiddleTypeByQueryParams = (
    queryParams: ReadonlyURLSearchParams
  ): SelectedHomeCareMiddleTypes[] => {
    const params = new URLSearchParams();
    const middleTypeQuery = queryParams.get("middle_query");
    if (!middleTypeQuery) {
      return [];
    }
    const middleTypeQueryParamsArray = middleTypeQuery.split(" ").map((val) => {
      return val;
    });
    const selectedMiddleTypeQueryParamsArray = Object.values(
      SELECTED_HOME_CARE_MIDDLE_TYPES
    ).filter((faci) => {
      return middleTypeQueryParamsArray.includes(faci);
    });
    return selectedMiddleTypeQueryParamsArray;
  };

  const getSelectedMedicalCareMiddleTypeByQueryParams = (
    queryParams: ReadonlyURLSearchParams
  ): SelectedMedicalCareMiddleTypes[] => {
    const params = new URLSearchParams();
    const middleTypeQuery = queryParams.get("middle_query");
    if (!middleTypeQuery) {
      return [];
    }
    const middleTypeQueryParamsArray = middleTypeQuery.split(" ").map((val) => {
      return val;
    });
    const selectedMiddleTypeQueryParamsArray = Object.values(
      SELECTED_MEDICAL_CARE_MIDDLE_TYPES
    ).filter((faci) => {
      return middleTypeQueryParamsArray.includes(faci);
    });
    return selectedMiddleTypeQueryParamsArray;
  };

  const getSelectedFacilityCareMiddleTypeByQueryParams = (
    queryParams: ReadonlyURLSearchParams
  ): SelectedFacilityCareMiddleTypes[] => {
    const params = new URLSearchParams();
    const middleTypeQuery = queryParams.get("middle_query");
    if (!middleTypeQuery) {
      return [];
    }
    const middleTypeQueryParamsArray = middleTypeQuery.split(" ").map((val) => {
      return val;
    });
    const selectedMiddleTypeQueryParamsArray = Object.values(
      SELECTED_FACILITY_MIDDLE_TYPES
    ).filter((faci) => {
      return middleTypeQueryParamsArray.includes(faci);
    });
    return selectedMiddleTypeQueryParamsArray;
  };

  return {
    searchParams,
    setQueryParamsBySelectedMiddleType,
    getSelectedHomeCareMiddleTypeByQueryParams,
    getSelectedMedicalCareMiddleTypeByQueryParams,
    getSelectedFacilityCareMiddleTypeByQueryParams,
    getSelectedMajorType,
  };
};

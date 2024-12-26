import { FacilityMajorType } from "@/types/facility.types";

import {
  CURRENT_MIDDLE_TYPE,
  SELECTED_FACILITY_MIDDLE_TYPES,
  SELECTED_FACILITY_REFINE_MAJOR_TYPES,
  SELECTED_HOME_CARE_MIDDLE_TYPES,
  SELECTED_MEDICAL_CARE_MIDDLE_TYPES,
} from "./FacilityRefineSearchForm.constants";

export type SelectedFacilityRefineMajorType = FacilityMajorType | "ALL";
export type SelectedHomeCareMiddleTypes =
  (typeof SELECTED_HOME_CARE_MIDDLE_TYPES)[keyof typeof SELECTED_HOME_CARE_MIDDLE_TYPES];
export type SelectedMedicalCareMiddleTypes =
  (typeof SELECTED_MEDICAL_CARE_MIDDLE_TYPES)[keyof typeof SELECTED_MEDICAL_CARE_MIDDLE_TYPES];
export type SelectedFacilityCareMiddleTypes =
  (typeof SELECTED_FACILITY_MIDDLE_TYPES)[keyof typeof SELECTED_FACILITY_MIDDLE_TYPES];

export type CurrentMiddleType =
  (typeof CURRENT_MIDDLE_TYPE)[keyof typeof CURRENT_MIDDLE_TYPE];
export type CurrentMajorType =
  (typeof SELECTED_FACILITY_REFINE_MAJOR_TYPES)[keyof typeof SELECTED_FACILITY_REFINE_MAJOR_TYPES];

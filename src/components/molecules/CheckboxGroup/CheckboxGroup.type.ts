import {
  FACILITY_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS,
  HOME_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS,
  MEDICAL_MIDDLE_TYPES_CARE_CHECKBOX_ITEMS,
} from "@/components/FacilityRefineSearchForm/FacilityRefineSearchForm.constants";

export type CheckboxItems<T extends string, U extends string> = {
  readonly label: T;
  readonly value: U;
};

export type HomeCareMiddoleTypesCheckboxItems = readonly CheckboxItems<
  (typeof HOME_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS)[number]["label"],
  (typeof HOME_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS)[number]["value"]
>[];

export type MedicalCareMiddoleTypesCheckboxItems = readonly CheckboxItems<
  (typeof MEDICAL_MIDDLE_TYPES_CARE_CHECKBOX_ITEMS)[number]["label"],
  (typeof MEDICAL_MIDDLE_TYPES_CARE_CHECKBOX_ITEMS)[number]["value"]
>[];

export type FacilityCareMiddoleTypesCheckboxItems = readonly CheckboxItems<
  (typeof FACILITY_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS)[number]["label"],
  (typeof FACILITY_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS)[number]["value"]
>[];

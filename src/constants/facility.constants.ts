import { Facility, SelectedMapFacility } from "@/types/facility.types";

export const FACILITY_MAJOR_TYPE = [
  "HOME_CARE_SERVICE",
  "COMMUNITY_BASED_SERVICE",
  "FACILITY_SERVICE",
  "MEDICAL_CARE_SERVICE",
  "WELFARE_SERVICE",
] as const;
export const FACILITY_MIDDLE_TYPE = [
  "HOME_CARE_SUPPORT_SERVICE",
  "HOME_VISIT_NURSING",
  "COMMUNITY_GENERAL_SUPPORT_CENTER",
  "HOME_VISIT_CLINIC",
  "HOSIPITAL",
] as const;
export const OPERATION_STATUS = ["open", "close", "pause"] as const;
export const DISPLAY_FACILITY_NANE_MAP = {
  HOME_VISIT_NURSING: "訪問看護ステーション",
  HOME_CARE_SUPPORT_SERVICE: "居宅介護支援事業所",
  COMMUNITY_GENERAL_SUPPORT_CENTER: "地域包括支援センター",
  HOME_VISIT_CLINIC: "訪問診療",
  HOSIPITAL: "病院",
} as const;

export const initialSelectedMapFacility: SelectedMapFacility[] =
  FACILITY_MIDDLE_TYPE.map((faci) => {
    return {
      key: faci,
      label: DISPLAY_FACILITY_NANE_MAP[faci],
      isSelected: faci === FACILITY_MIDDLE_TYPE[0] ? true : false,
    };
  });

export const initialFacilityInfo: Facility = {
  documentId: "",
  designatedNumber: 0,
  serviceMajorType: FACILITY_MAJOR_TYPE[0],
  serviceMiddleType: FACILITY_MIDDLE_TYPE[0],
  officeName: "",
  postCode: "",
  prefCode: 0,
  cityCode: 0,
  officeAddress: "",
  officeTelNumber: "",
  officeFaxNumber: "",
  designatedDate: "",
  ManagementCorporationNumber: null,
  latLang: {
    latitude: 0,
    longitude: 0,
  },
  operationStatus: "open",
  remark: "",
  url: "",
};

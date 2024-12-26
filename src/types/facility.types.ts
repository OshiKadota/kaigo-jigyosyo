import {
  DISPLAY_FACILITY_NANE_MAP,
  FACILITY_MAJOR_TYPE,
  FACILITY_MIDDLE_TYPE,
} from "@/constants/facility.constants";

export type FacilityMajorType = (typeof FACILITY_MAJOR_TYPE)[number];
export type FacilityMiddleType = (typeof FACILITY_MIDDLE_TYPE)[number];
export type FacilityLabel =
  (typeof DISPLAY_FACILITY_NANE_MAP)[keyof typeof DISPLAY_FACILITY_NANE_MAP];
export type SelectedMapFacility = {
  key: FacilityMiddleType;
  label: FacilityLabel;
  isSelected: boolean;
};
export type OperationStatus = "open" | "close" | "pause";
export type Facility = {
  documentId: string;
  designatedNumber: number;
  serviceMajorType: FacilityMajorType;
  serviceMiddleType: FacilityMiddleType;
  officeName: string;
  postCode: string;
  cityCode: number;
  prefCode: number;
  officeAddress: string;
  officeTelNumber: string;
  officeFaxNumber: string;
  designatedDate: string;
  ManagementCorporationNumber: number | null;
  latLang: {
    latitude: number;
    longitude: number;
  };
  operationStatus: OperationStatus;
  remark: string;
  url: string;
};

export type CsvFaclity = {
  designatedNumber: number;
  serviceMajorType: FacilityMajorType;
  serviceMiddleType: FacilityMiddleType;
  officeName: string;
  postCode: string;
  cityCode: number;
  prefCode: number;
  officeAddress: string;
  officeTelNumber: string;
  officeFaxNumber: string;
  designatedDate: string;
  ManagementCorporationNumber: number | null;
  operationStatus: OperationStatus;
  remark: string;
  url: string;
};

export type CsvFaclityStringType = {
  designatedNumber: string;
  serviceMajorType: string;
  serviceMiddleType: string;
  officeName: string;
  postCode: string;
  cityCode: string;
  prefCode: string;
  officeAddress: string;
  officeTelNumber: string;
  officeFaxNumber: string;
  designatedDate: string;
  ManagementCorporationNumber: string;
  operationStatus: string;
  remark: string;
  url: string;
};

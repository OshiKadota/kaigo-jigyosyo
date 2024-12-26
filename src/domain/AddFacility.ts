import {
  FACILITY_MAJOR_TYPE,
  FACILITY_MIDDLE_TYPE,
  OPERATION_STATUS,
} from "@/constants/facility.constants";
import {
  CsvFaclity,
  FacilityMajorType,
  FacilityMiddleType,
  OperationStatus,
} from "@/types/facility.types";
import { isValidDateFormat } from "@/utils/date.utils";
import { isNumber } from "@/utils/number.utils";

export class AddFacility {
  readonly _facility: CsvFaclity;
  constructor(
    cityCode: string,
    designatedDate: string,
    designatedNumber: string,
    officeAddress: string,
    officeFaxNumber: string,
    officeName: string,
    officeTelNumber: string,
    operationStatus: string,
    postCode: string,
    prefCode: string,
    remark: string,
    serviceMajorType: string,
    serviceMiddleType: string,
    url: string
  ) {
    if (!isNumber(Number(cityCode))) {
      throw new Error(`cityCode is invalid value, value: ${cityCode}`);
    }
    if (!isNumber(Number(prefCode))) {
      throw new Error(`prefCode is invalid value, value: ${prefCode}`);
    }
    if (!isNumber(Number(designatedNumber))) {
      throw new Error(
        `designatedNumber is invalid value, value: ${designatedNumber}`
      );
    }
    if (!isValidDateFormat(designatedDate)) {
      throw new Error(
        `designatedDate is invalid value, value: ${designatedDate}`
      );
    }
    if (!this.isOperationStatusType(operationStatus)) {
      throw new Error(
        `operationStatus is invalid value, value: ${operationStatus}`
      );
    }
    if (!this.isServiceMajorType(serviceMajorType)) {
      throw new Error(
        `serviceMajorType is invalid value, value: ${serviceMajorType}`
      );
    }
    if (!this.isServiceMiddleType(serviceMiddleType)) {
      throw new Error(
        `serviceMiddleType is invalid value, value: ${serviceMiddleType}`
      );
    }
    this._facility = {
      officeName,
      officeAddress,
      officeFaxNumber,
      officeTelNumber,
      postCode,
      remark,
      url,
      cityCode: Number(cityCode),
      prefCode: Number(prefCode),
      designatedNumber: Number(designatedNumber),
      ManagementCorporationNumber: null,
      designatedDate,
      operationStatus: operationStatus as OperationStatus,
      serviceMajorType: serviceMajorType as FacilityMajorType,
      serviceMiddleType: serviceMiddleType as FacilityMiddleType,
    };
  }

  isOperationStatusType(value: string) {
    return OPERATION_STATUS.includes(value as OperationStatus);
  }
  isServiceMajorType(value: string) {
    return FACILITY_MAJOR_TYPE.includes(value as FacilityMajorType);
  }
  isServiceMiddleType(value: string) {
    return FACILITY_MIDDLE_TYPE.includes(value as FacilityMiddleType);
  }

  get facility(): CsvFaclity {
    return this._facility;
  }
}

import GeocodingAPI from "@/api/GeocodingAPI";
import { CSV_HEADER } from "@/constants/addFacility.constants";
import { AddFacility } from "@/domain/AddFacility";
import { db } from "@/lib/firebase";
import { FacilitiesRepository } from "@/repository/FacilitiesRepository";
import { AddFacilityService } from "@/service/AddFacilityService";
import { CsvFaclity, CsvFaclityStringType } from "@/types/facility.types";
import Papa, { ParseResult } from "papaparse";
import { useMemo, useState } from "react";

export const useAddFacility = () => {
  const facilitiesRepository = new FacilitiesRepository(db);
  const geocodingAPI = new GeocodingAPI();
  const addFacilityService = new AddFacilityService(
    facilitiesRepository,
    geocodingAPI
  );
  const [csvData, setCsvData] = useState<CsvFaclity[]>([]);

  const disableAddFacilityButton = useMemo((): boolean => {
    if (csvData.length === 0) {
      return true;
    }
    return false;
  }, [csvData]);
  const csvParse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (!file || file.length === 0) {
      console.log("ファイルが選択されていません");
      return;
    }
    Papa.parse(file[0], {
      complete: (result: ParseResult<any>) => {
        const headers = result.meta.fields;
        if (!headers || !validateHeader(headers)) {
          console.error("headerが誤りがあります。");
          return;
        }
        const ret = initField(result.data);
        console.log("ret", ret);
        setCsvData(ret);
      },
      header: true,
    });
  };

  const validateHeader = (headers: string[]): boolean => {
    return CSV_HEADER.every((val) => headers.includes(val));
  };

  const initField = (field: CsvFaclityStringType[]): CsvFaclity[] => {
    return field.map((val) => {
      const addFacility = new AddFacility(
        val.cityCode,
        val.designatedDate,
        val.designatedNumber,
        val.officeAddress,
        val.officeFaxNumber,
        val.officeName,
        val.officeTelNumber,
        val.operationStatus,
        val.postCode,
        val.prefCode,
        val.remark,
        val.serviceMajorType,
        val.serviceMiddleType,
        val.url
      );
      return addFacility.facility;
    });
  };

  const onClickAddFacilityButton = async () => {
    try {
      console.log("onClickAddFacilityButton");
      await addFacilityService.addDocs(csvData);
      setCsvData([]);
    } catch (error) {
      console.error(`field to onClickAddFacilityButton.error:${error}`);
    }
  };
  return {
    csvData,
    csvParse,
    onClickAddFacilityButton,
    disableAddFacilityButton,
  };
};

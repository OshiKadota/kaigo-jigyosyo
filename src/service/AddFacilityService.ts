import GeocodingAPI from "@/api/GeocodingAPI";
import { FacilitiesRepository } from "@/repository/FacilitiesRepository";
import { CsvFaclity } from "@/types/facility.types";

export class AddFacilityService {
  private facilityRepository: FacilitiesRepository;
  private geocodingAPI: GeocodingAPI;
  constructor(
    facilityRepository: FacilitiesRepository,
    geocodingAPI: GeocodingAPI
  ) {
    this.facilityRepository = facilityRepository;
    this.geocodingAPI = geocodingAPI;
  }

  public async addDocs(facilities: CsvFaclity[]): Promise<void> {
    const promiseRet = facilities.map(async (faci) => {
      const geo = await this.geocodingAPI.getLatLng(faci.officeAddress);
      return {
        ...faci,
        documentId: "",
        latLang: {
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
      };
    });
    const ret = await Promise.all(promiseRet);
    await this.facilityRepository.addDocs(ret);

    try {
    } catch (error) {
      console.error(`AddFacilityService addDocs feild. error:${error}`);
    }
  }
}

import axios from "axios";

export class GeocodingAPI {
  constructor() {}

  public async getLatLng(
    address: string
  ): Promise<{ latitude: number; longitude: number }> {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: address,
            key: process.env.NEXT_PUBLIC_GEOCODING_API_KEY,
          },
        }
      );

      const results = response.data.results;

      if (!Boolean(results.length > 0)) {
        console.error(`${address}が見つかりません。`);
        throw new Error("No results found");
      }

      const location = results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } catch (error) {
      console.error(`${address}の取得に失敗しました。error: ${error}`);
      throw new Error(`Failed to get LatLng for address ${address}: ${error}`);
    }
  }
}

export default GeocodingAPI;

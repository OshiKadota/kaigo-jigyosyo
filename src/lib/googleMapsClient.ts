import createAxiosInstance from "./axios";

// Google Maps API用のaxiosインスタンスを作成
const googleMapsClient = createAxiosInstance({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/json",
  params: {
    key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY, // 環境変数からAPIキーを取得
  },
});

export default googleMapsClient;

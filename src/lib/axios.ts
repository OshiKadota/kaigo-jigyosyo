import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

// axios の汎用的なインスタンスを生成する関数
const createAxiosInstance = (
  config: AxiosRequestConfig = {}
): AxiosInstance => {
  return axios.create({
    timeout: 5000, // デフォルトのタイムアウトを設定（必要に応じて変更可能）
    headers: {
      "Content-Type": "application/json",
    },
    ...config, // 引数として渡された設定を上書きする
  });
};

export default createAxiosInstance;

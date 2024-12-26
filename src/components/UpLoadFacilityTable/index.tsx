"use client";

import { CsvFaclity } from "@/types/facility.types";

type Props = {
  facility: CsvFaclity[];
};

export default function UpLoadFacilityTable(props: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">指定日</th>
            <th className="border p-2">指定番号</th>
            <th className="border p-2">サービス種別</th>
            <th className="border p-2">提供サービス</th>
            <th className="border p-2">施設名</th>
            <th className="border p-2">郵便番号</th>
            <th className="border p-2">都道府県コード</th>
            <th className="border p-2">市区町村コード</th>
            <th className="border p-2">住所</th>
            <th className="border p-2">電話番号</th>
            <th className="border p-2">ファックス番号</th>
            <th className="border p-2">開設状況</th>
            <th className="border p-2">メモ</th>
            <th className="border p-2">URL</th>
          </tr>
        </thead>
        <tbody>
          {props.facility.map((faci, index) => {
            return (
              <tr key={index}>
                <td className="border p-2">{faci.designatedDate}</td>
                <td className="border p-2">{faci.designatedNumber}</td>
                <td className="border p-2">{faci.serviceMajorType}</td>
                <td className="border p-2">{faci.serviceMiddleType}</td>
                <td className="border p-2">{faci.officeName}</td>
                <td className="border p-2">{faci.postCode}</td>
                <td className="border p-2">{faci.prefCode}</td>
                <td className="border p-2">{faci.cityCode}</td>
                <td className="border p-2">{faci.officeAddress}</td>
                <td className="border p-2">{faci.officeTelNumber}</td>
                <td className="border p-2">{faci.officeFaxNumber}</td>
                <td className="border p-2">{faci.operationStatus}</td>
                <td className="border p-2">{faci.remark}</td>
                <td className="border p-2">{faci.url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

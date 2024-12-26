"use client";

import Button from "../atoms/Button";
import UpLoadFacilityTable from "../UpLoadFacilityTable";
import { useAddFacility } from "./useAddFacility";

export default function AddFacilityPage() {
  const {
    csvData,
    csvParse,
    onClickAddFacilityButton,
    disableAddFacilityButton,
  } = useAddFacility();
  return (
    <>
      <div className="p-3">
        <h1 className="text-lg font-bold">施設追加</h1>

        <input
          type="file"
          accept=".csv"
          onChange={(event) => csvParse(event)}
        />

        <Button
          value="施設を追加する"
          onClick={() => onClickAddFacilityButton()}
          disable={disableAddFacilityButton}
        />

        <p>読み込まれたデータ</p>
        {csvData.length === 0 && <p>データが読み込まれていません</p>}
        {csvData.length > 0 && <UpLoadFacilityTable facility={csvData} />}
      </div>
    </>
  );
}

"use client";

import { DISPLAY_FACILITY_NANE_MAP } from "@/constants/facility.constants";
import { useListPage } from "./useListPage";
import Button from "@/components/atoms/Button";
import BaseDialog from "../molecules/baseDialog";
import FacilityInfoDailogArticle from "../molecules/FacilityInfoDailogArticle";
import { Facility } from "@/types/facility.types";

export default function ListPage() {
  const {
    facilities,
    isDialogOpen,
    setIsDialogOpen,
    onClickDisplayFacilityInfo,
    selectedFacilityInfo,
    onClickFacilityDelete,
    onClickFacilityUpdate,
  } = useListPage();

  return (
    <>
      <div>
        <p>Lsit page</p>
      </div>
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>提供サービス</th>
              <th>事業所名</th>
              <th>住所</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((faci, index) => {
              return (
                <tr key={faci.documentId}>
                  <td>{DISPLAY_FACILITY_NANE_MAP[faci.serviceMiddleType]}</td>
                  <td>{faci.officeName}</td>
                  <td>{faci.officeAddress}</td>
                  <td>
                    <Button
                      onClick={() => onClickDisplayFacilityInfo(index)}
                      value={"詳細を見る"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <BaseDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          <FacilityInfoDailogArticle
            facility={selectedFacilityInfo}
            onClickFacilityUpdate={(faci: Facility) =>
              onClickFacilityUpdate(faci)
            }
            onClickFacilityDelete={(documentId: string) =>
              onClickFacilityDelete(documentId)
            }
          />
        </BaseDialog>
      </div>
    </>
  );
}

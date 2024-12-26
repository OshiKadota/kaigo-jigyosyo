"use client";

import { DISPLAY_FACILITY_NANE_MAP } from "@/constants/facility.constants";
import Button from "@/components/atoms/Button";
import BaseDialog from "../molecules/baseDialog";
import FacilityInfoDailogArticle from "../molecules/FacilityInfoDailogArticle";
import { Facility } from "@/types/facility.types";

type Props = {
  facilities: Facility[];
  isFacilityEditDialogOpen: boolean;
  onCloseFacilityInfoDailog: () => void;
  openFacilityInfoDialog: (index: number) => void;
  facilityInfoDialogTarget: Facility;
  onClickFacilityUpdate: (facility: Facility) => void;
  onClickFacilityDelete: (documentId: string) => void;
};

export default function ViewList(props: Props) {
  return (
    <>
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
            {props.facilities.map((faci, index) => {
              return (
                <tr key={faci.documentId}>
                  <td>{DISPLAY_FACILITY_NANE_MAP[faci.serviceMiddleType]}</td>
                  <td>{faci.officeName}</td>
                  <td>{faci.officeAddress}</td>
                  <td>
                    <Button
                      onClick={() => props.openFacilityInfoDialog(index)}
                      value={"詳細を見る"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <BaseDialog
          isOpen={props.isFacilityEditDialogOpen}
          onClose={() => props.onCloseFacilityInfoDailog()}
        >
          <FacilityInfoDailogArticle
            facility={props.facilityInfoDialogTarget}
            onClickFacilityUpdate={(faci: Facility) =>
              props.onClickFacilityUpdate(faci)
            }
            onClickFacilityDelete={(documentId: string) =>
              props.onClickFacilityDelete(documentId)
            }
          />
        </BaseDialog>
      </div>
    </>
  );
}

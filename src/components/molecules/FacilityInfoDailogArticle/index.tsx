import Button from "@/components/atoms/Button";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";
import { DISPLAY_FACILITY_NANE_MAP } from "@/constants/facility.constants";
import { Facility } from "@/types/facility.types";
import { useFacilityInfoDailogArticle } from "./useFacilityInfoDailogArticle";

type Props = {
  facility: Facility;
  onClickFacilityDelete: (documentId: string) => void;
  onClickFacilityUpdate: (facility: Facility) => void;
};

export default function FacilityInfoDailogArticle(props: Props) {
  const { facility } = props;
  const {
    formFacility,
    onChangeTextField,
    isOpenConfirmDialog,
    setIsOpenConfirmDialog,
  } = useFacilityInfoDailogArticle(facility);
  return (
    <>
      <p>id：{formFacility.documentId}</p>
      <p>事業所番号：{formFacility.designatedNumber}</p>
      <p>施設名：{formFacility.officeName}</p>
      <p>
        提供サービス：
        {DISPLAY_FACILITY_NANE_MAP[formFacility.serviceMiddleType]}
      </p>
      <p>
        電話番号：
        <input
          onChange={(event) =>
            onChangeTextField(event.target.value, "officeTelNumber")
          }
          value={formFacility.officeTelNumber}
        />
      </p>
      <p>
        FAX番号：
        <input
          onChange={(event) =>
            onChangeTextField(event.target.value, "officeFaxNumber")
          }
          value={formFacility.officeFaxNumber}
        />
      </p>
      <p>
        URL：
        <input
          onChange={(event) => onChangeTextField(event.target.value, "url")}
          value={formFacility.url}
        />
      </p>
      <p>指定日：{formFacility.designatedDate}</p>
      <p>運営会社：{formFacility.ManagementCorporationNumber}</p>
      <div>
        <label htmlFor="operation-status">運営状態:</label>
        <select
          onChange={(event) =>
            onChangeTextField(event.target.value, "operationStatus")
          }
          value={formFacility.operationStatus}
          name="operationStatus"
          id="operation-status"
        >
          <option value="opne">運営中</option>
          <option value="close">廃止</option>
          <option value="pause">休止</option>
        </select>
      </div>
      <p>
        メモ：
        <textarea
          onChange={(event) => onChangeTextField(event.target.value, "remark")}
          value={formFacility.remark}
        />
      </p>
      <Button
        onClick={() => props.onClickFacilityUpdate(formFacility)}
        value={"更新する"}
      />
      <Button onClick={() => setIsOpenConfirmDialog(true)} value={"削除する"} />

      <ConfirmDialog
        isOpen={isOpenConfirmDialog}
        onClose={() => setIsOpenConfirmDialog(false)}
        onClickAction={() =>
          props.onClickFacilityDelete(formFacility.documentId)
        }
      />
    </>
  );
}

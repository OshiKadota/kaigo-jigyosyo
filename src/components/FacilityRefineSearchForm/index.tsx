"use client";

import { FacilityMajorType } from "@/types/facility.types";
import { ChangeEvent } from "react";
import Button from "../atoms/Button";
import CheckboxGroup from "../molecules/CheckboxGroup";
import {
  FacilityCareMiddoleTypesCheckboxItems,
  HomeCareMiddoleTypesCheckboxItems,
  MedicalCareMiddoleTypesCheckboxItems,
} from "../molecules/CheckboxGroup/CheckboxGroup.type";
import { SELECTED_FACILITY_REFINE_MAJOR_TYPES } from "./FacilityRefineSearchForm.constants";
import {
  SelectedFacilityCareMiddleTypes,
  SelectedFacilityRefineMajorType,
  SelectedHomeCareMiddleTypes,
  SelectedMedicalCareMiddleTypes,
} from "./FacilityRefineSearchForm.type";

type Props = {
  selectedFacilityRefineMajorType: SelectedFacilityRefineMajorType;
  onChangeSelectedFacilityRefineMajorType: (
    value: SelectedFacilityRefineMajorType
  ) => void;
  onChangeMiddleTypeCheckbox: (
    event: ChangeEvent<HTMLInputElement>,
    majorType: FacilityMajorType
  ) => void;
  selectedHomeCareRefineMiddleType: SelectedHomeCareMiddleTypes[];
  homeCareMiddleTypesCheckboxItems: HomeCareMiddoleTypesCheckboxItems;
  selectedMedicalCareRefineMiddleType: SelectedMedicalCareMiddleTypes[];
  medicalCareMiddleTypesCheckboxItems: MedicalCareMiddoleTypesCheckboxItems;
  selectedFacilityCareRefineMiddleType: SelectedFacilityCareMiddleTypes[];
  facilityCareMiddleTypesCheckboxItems: FacilityCareMiddoleTypesCheckboxItems;
  disableRefineButton: boolean;
  onClickRefineFacilityButton: () => void;
};

const FacilityRefineSearchForm = (props: Props) => {
  return (
    <div className="h-[350px]">
      <h2 className="font-bold">絞り込み検索</h2>
      <h3>サービス種別</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <label className="inline-flex items-center">
          <input
            type="radio"
            value={SELECTED_FACILITY_REFINE_MAJOR_TYPES.ALL}
            checked={props.selectedFacilityRefineMajorType === "ALL"}
            onChange={() =>
              props.onChangeSelectedFacilityRefineMajorType(
                SELECTED_FACILITY_REFINE_MAJOR_TYPES.ALL
              )
            }
            className="form-radio text-blue-600"
          />
          <span className="ml-2">全て</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value={SELECTED_FACILITY_REFINE_MAJOR_TYPES.HOME_CARE_SERVICE}
            checked={
              props.selectedFacilityRefineMajorType === "HOME_CARE_SERVICE"
            }
            onChange={() =>
              props.onChangeSelectedFacilityRefineMajorType(
                SELECTED_FACILITY_REFINE_MAJOR_TYPES.HOME_CARE_SERVICE
              )
            }
            className="form-radio text-blue-600"
          />
          <span className="ml-2">居宅サービス</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value={SELECTED_FACILITY_REFINE_MAJOR_TYPES.MEDICAL_CARE_SERVICE}
            checked={
              props.selectedFacilityRefineMajorType === "MEDICAL_CARE_SERVICE"
            }
            onChange={() =>
              props.onChangeSelectedFacilityRefineMajorType(
                SELECTED_FACILITY_REFINE_MAJOR_TYPES.MEDICAL_CARE_SERVICE
              )
            }
            className="form-radio text-blue-600"
          />
          <span className="ml-2">医療サービス</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value={SELECTED_FACILITY_REFINE_MAJOR_TYPES.FACILITY_SERVICE}
            checked={
              props.selectedFacilityRefineMajorType === "FACILITY_SERVICE"
            }
            onChange={() =>
              props.onChangeSelectedFacilityRefineMajorType(
                SELECTED_FACILITY_REFINE_MAJOR_TYPES.FACILITY_SERVICE
              )
            }
            className="form-radio text-blue-600"
          />
          <span className="ml-2">施設サービス</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value={SELECTED_FACILITY_REFINE_MAJOR_TYPES.WELFARE_SERVICE}
            checked={
              props.selectedFacilityRefineMajorType === "WELFARE_SERVICE"
            }
            onChange={() =>
              props.onChangeSelectedFacilityRefineMajorType(
                SELECTED_FACILITY_REFINE_MAJOR_TYPES.WELFARE_SERVICE
              )
            }
            className="form-radio text-blue-600"
          />
          <span className="ml-2">福祉障害サービス</span>
        </label>
      </div>
      <h3>提供サービス</h3>
      <div className="h-[150px]">
        {props.selectedFacilityRefineMajorType === "HOME_CARE_SERVICE" && (
          <CheckboxGroup
            checkboxItems={props.homeCareMiddleTypesCheckboxItems}
            checkedValues={props.selectedHomeCareRefineMiddleType}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              props.onChangeMiddleTypeCheckbox(event, "HOME_CARE_SERVICE")
            }
          />
        )}
        {props.selectedFacilityRefineMajorType === "MEDICAL_CARE_SERVICE" && (
          <CheckboxGroup
            checkboxItems={props.medicalCareMiddleTypesCheckboxItems}
            checkedValues={props.selectedMedicalCareRefineMiddleType}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              props.onChangeMiddleTypeCheckbox(event, "MEDICAL_CARE_SERVICE")
            }
          />
        )}
        {props.selectedFacilityRefineMajorType === "FACILITY_SERVICE" && (
          <CheckboxGroup
            checkboxItems={props.facilityCareMiddleTypesCheckboxItems}
            checkedValues={props.selectedFacilityCareRefineMiddleType}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              props.onChangeMiddleTypeCheckbox(event, "FACILITY_SERVICE")
            }
          />
        )}
      </div>
      <Button
        value="絞り込み"
        onClick={props.onClickRefineFacilityButton}
        disable={props.disableRefineButton}
      />
    </div>
  );
};

export default FacilityRefineSearchForm;

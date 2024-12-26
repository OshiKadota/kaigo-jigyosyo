"use client";

import { FacilityMajorType } from "@/types/facility.types";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { ChangeEvent, useState } from "react";
import FacilityRefineSearchForm from "../FacilityRefineSearchForm";
import {
  DISPLAY_CURRENT_MAJOR_TYPE_MAP,
  DISPLAY_CURRENT_MIDDLE_TYPE_MAP,
  FACILITY_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS,
  HOME_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS,
  MEDICAL_MIDDLE_TYPES_CARE_CHECKBOX_ITEMS,
} from "../FacilityRefineSearchForm/FacilityRefineSearchForm.constants";
import { GoogleMap } from "../GoogleMap";
import { Marker } from "../GoogleMap/Marker";
import BaseDialog from "../molecules/baseDialog";
import ViewList from "../ViewList";
import { useLocal } from "./useLocal";

const ViewPage = () => {
  const {
    facilities,
    isFacilityEditDialogOpen,
    setIsFacilityEditDialogOpen,
    openFacilityInfoDialog,
    facilityInfoDialogTarget,
    onClickFacilityUpdate,
    onClickFacilityDelete,
    isRefineSearchDialogOpen,
    setIsRefineSearchDialogOpen,
    selectedFacilityRefineMajorType,
    onChangeSelectedFacilityRefineMajorType,
    selectedHomeCareRefineMiddleType,
    selectedMedicalCareRefineMiddleType,
    selectedFacilityCareRefineMiddleType,
    onChangeMiddleTypeCheckbox,
    disableRefineButton,
    onClickRefineFacilityButton,
    currentMiddleType,
    currentMajorType,
  } = useLocal();
  const [activeTab, setActiveTab] = useState("list");
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;
  const position = { lat: 35.836409, lng: 139.805774 };
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <div>
      <BaseDialog
        isOpen={isRefineSearchDialogOpen}
        onClose={() => setIsRefineSearchDialogOpen(false)}
      >
        <FacilityRefineSearchForm
          selectedFacilityRefineMajorType={selectedFacilityRefineMajorType}
          onChangeSelectedFacilityRefineMajorType={
            onChangeSelectedFacilityRefineMajorType
          }
          onChangeMiddleTypeCheckbox={(
            event: ChangeEvent<HTMLInputElement>,
            majorType: FacilityMajorType
          ) => onChangeMiddleTypeCheckbox(event, majorType)}
          selectedHomeCareRefineMiddleType={selectedHomeCareRefineMiddleType}
          homeCareMiddleTypesCheckboxItems={
            HOME_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS
          }
          selectedMedicalCareRefineMiddleType={
            selectedMedicalCareRefineMiddleType
          }
          medicalCareMiddleTypesCheckboxItems={
            MEDICAL_MIDDLE_TYPES_CARE_CHECKBOX_ITEMS
          }
          selectedFacilityCareRefineMiddleType={
            selectedFacilityCareRefineMiddleType
          }
          facilityCareMiddleTypesCheckboxItems={
            FACILITY_CARE_MIDDLE_TYPES_CHECKBOX_ITEMS
          }
          disableRefineButton={disableRefineButton}
          onClickRefineFacilityButton={onClickRefineFacilityButton}
        />
      </BaseDialog>
      <div className="w-full bg-slate-200 rounded-md">
        <p>サービス種別：{DISPLAY_CURRENT_MAJOR_TYPE_MAP[currentMajorType]}</p>
        <p>
          提供サービス：
          {currentMiddleType
            .map((val) => {
              return DISPLAY_CURRENT_MIDDLE_TYPE_MAP[val];
            })
            .join(",")}
        </p>
        <p>表示件数：{facilities.length}件</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setIsRefineSearchDialogOpen(true)}
        >
          絞り込み
        </button>
      </div>
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "list"
              ? "border-b-4 border-blue-500 text-blue-500"
              : ""
          }`}
          onClick={() => setActiveTab("list")}
        >
          リストビュー
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "map"
              ? "border-b-4 border-blue-500 text-blue-500"
              : ""
          }`}
          onClick={() => setActiveTab("map")}
        >
          マップビュー
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "map" ? (
          <div className="w-full h-full">
            <div className="w-full view-list-height">
              <Wrapper apiKey={mapApiKey} render={render}>
                <GoogleMap
                  style={{ width: "100%", height: "100%" }}
                  center={position}
                >
                  {facilities.map((faci, index) => {
                    return (
                      <Marker
                        key={index}
                        faci={faci}
                        options={{
                          position: {
                            lat: faci.latLang.latitude,
                            lng: faci.latLang.longitude,
                          },
                        }}
                      />
                    );
                  })}
                </GoogleMap>
              </Wrapper>
            </div>
          </div>
        ) : (
          <div className="view-list-height overflow-y-auto">
            <ViewList
              facilities={facilities}
              isFacilityEditDialogOpen={isFacilityEditDialogOpen}
              onCloseFacilityInfoDailog={() =>
                setIsFacilityEditDialogOpen(false)
              }
              openFacilityInfoDialog={(index) => openFacilityInfoDialog(index)}
              facilityInfoDialogTarget={facilityInfoDialogTarget}
              onClickFacilityUpdate={onClickFacilityUpdate}
              onClickFacilityDelete={onClickFacilityDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPage;

"use client";

import {
  FacilityMiddleType,
  SelectedMapFacility,
} from "@/types/facility.types";
import Button from "../atoms/Button";

type Props = {
  displayFacilitiesNumber: number;
  onChangeSelectedMapFacility: (
    changedKey: FacilityMiddleType,
    currentValue: SelectedMapFacility[]
  ) => void;
  clickSwitchFacilityButton: () => void;
  selectedMapFacility: SelectedMapFacility[];
  disableSwitchFacilityButton: boolean;
  disableSelectedMapFacility: boolean;
};

const MapSearchBar = (props: Props) => {
  return (
    <>
      <div className="h-28 w-full bg-slate-400">
        <p>Map page</p>
        <p>表示件数：{props.displayFacilitiesNumber}件</p>
        <div className="flex">
          {props.selectedMapFacility.map((faci) => {
            return (
              <label key={faci.key}>
                <input
                  disabled={props.disableSelectedMapFacility}
                  type="checkbox"
                  checked={faci.isSelected}
                  onChange={() =>
                    props.onChangeSelectedMapFacility(
                      faci.key,
                      props.selectedMapFacility
                    )
                  }
                />
                {faci.label}
              </label>
            );
          })}
        </div>
        <Button
          onClick={props.clickSwitchFacilityButton}
          value="検索する"
          disable={props.disableSwitchFacilityButton}
        />
      </div>
    </>
  );
};

export default MapSearchBar;

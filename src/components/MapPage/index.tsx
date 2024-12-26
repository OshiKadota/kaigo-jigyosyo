"use client";

import {
  FacilityMiddleType,
  SelectedMapFacility,
} from "@/types/facility.types";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap } from "../GoogleMap";
import { Marker } from "../GoogleMap/Marker";
import MapSearchBar from "../MapSearchBar";
import { useMapPage } from "./useMapPage";

export default function MapPage() {
  const {
    facilities,
    onChangeSelectedMapFacility,
    clickSwitchFacilityButton,
    selectedMapFacility,
    disableSwitchFacilityButton,
    disableSelectedMapFacility,
  } = useMapPage();
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;
  const position = { lat: 35.836409, lng: 139.805774 };
  return (
    <div className="h-full w-full">
      <MapSearchBar
        displayFacilitiesNumber={facilities.length}
        onChangeSelectedMapFacility={(
          changedKey: FacilityMiddleType,
          currentValue: SelectedMapFacility[]
        ) => onChangeSelectedMapFacility(changedKey, currentValue)}
        clickSwitchFacilityButton={clickSwitchFacilityButton}
        selectedMapFacility={selectedMapFacility}
        disableSwitchFacilityButton={disableSwitchFacilityButton}
        disableSelectedMapFacility={disableSelectedMapFacility}
      />
      <Wrapper apiKey={mapApiKey} render={render}>
        <div className="custom-map-height w-full">
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
        </div>
      </Wrapper>
    </div>
  );
}

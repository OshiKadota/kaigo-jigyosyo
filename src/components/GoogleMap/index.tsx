"use client";

import {
  useRef,
  useState,
  useEffect,
  isValidElement,
  Children,
  cloneElement,
  useCallback,
} from "react";
import { FEATURE_STYLE_OPTIONS } from "./googlemap.constants";

type MapProps = google.maps.MapOptions & {
  style: { [key: string]: string };
  children?:
    | React.ReactElement<google.maps.MarkerOptions>[]
    | React.ReactElement<google.maps.MarkerOptions>;
};

export const GoogleMap: React.FC<MapProps> = ({
  children,
  style,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const option = {
        center: options.center,
        zoom: 12,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        minZoom: 12,
        maxZoom: 18,
        keyboardShortcuts: false,
        mapId: "cd21351eaaed5bd4",
      };
      const _map = new window.google.maps.Map(ref.current, option);
      setMap(_map);
    }
  }, [ref, map, options.center]);

  useEffect(() => {
    // @ts-ignore
    const _featureLayer = map?.getFeatureLayer("LOCALITY");

    if (map && _featureLayer && !_featureLayer.style) {
      // @ts-ignore
      _featureLayer.style = (options: { feature: { placeId: string } }) => {
        if (options.feature.placeId == "ChIJR87JdDCRGGARC10Bnx_VC1s") {
          return FEATURE_STYLE_OPTIONS.GREEN;
        }
        if (options.feature.placeId == "ChIJ9-6cDIqUGGARoNm7wboysrc") {
          return FEATURE_STYLE_OPTIONS.RED;
        }
        if (options.feature.placeId == "ChIJd_3UPmKQGGARku_bgTDQqtI") {
          return FEATURE_STYLE_OPTIONS.BLUE;
        }
        if (options.feature.placeId == "ChIJc9e06BeWGGARwvvDrb4u2s4") {
          return FEATURE_STYLE_OPTIONS.INDIGO;
        }
        if (options.feature.placeId == "ChIJd3M0aNyRGGARQEJIfw6HgME") {
          return FEATURE_STYLE_OPTIONS.YELLOW;
        }
      };
    }
  }, [map]);

  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

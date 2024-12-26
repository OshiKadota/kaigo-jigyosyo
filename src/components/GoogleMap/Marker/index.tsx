"use client";

import { useEffect, useState } from "react";

type MarkerProps = {
  options: google.maps.MarkerOptions;
  faci: any;
};

const generateInfoWindowContent = (facility: any) => {
  return `<div style="min-width: 200px;">
  <h3>${facility.officeName}</h3>
  <p><strong>住所:</strong> ${facility.officeAddress}</p>
  <p><strong>電話番号:</strong> ${facility.officeTelNumber}</p>
  </div>
  `;
};

export const Marker: React.FC<MarkerProps> = ({ faci, ...options }) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker && infoWindow) {
      marker.addListener("mouseover", () => {
        infoWindow.open({
          anchor: marker,
        });
      });
      marker.addListener("mouseout", () => {
        infoWindow.close();
      });
    }
  }, [infoWindow]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options as google.maps.MarkerOptions);

      if (!infoWindow) {
        setInfoWindow(
          new google.maps.InfoWindow({
            content: generateInfoWindowContent(faci),
            headerDisabled: true,
          })
        );
      }
    }
  }, [marker, options]);

  return null;
};

export const FEATURE_STYLE_OPTIONS: {
  [color: string]: google.maps.FeatureStyleOptions;
} = {
  GREEN: {
    strokeColor: "#008000",
    strokeOpacity: 0.5,
    strokeWeight: 3.0,
    fillColor: "#008000",
    fillOpacity: 0.1,
  },
  RED: {
    strokeColor: "#ff0000",
    strokeOpacity: 0.5,
    strokeWeight: 3.0,
    fillColor: "#ff0000",
    fillOpacity: 0.1,
  },
  BLUE: {
    strokeColor: "#0000ff",
    strokeOpacity: 0.5,
    strokeWeight: 3.0,
    fillColor: "#0000ff",
    fillOpacity: 0.1,
  },
  INDIGO: {
    strokeColor: "#4b0082",
    strokeOpacity: 0.5,
    strokeWeight: 3.0,
    fillColor: "#4b0082",
    fillOpacity: 0.1,
  },
  YELLOW: {
    strokeColor: "#9acd32",
    strokeOpacity: 0.5,
    strokeWeight: 3.0,
    fillColor: "#9acd32",
    fillOpacity: 0.1,
  },
} as const;

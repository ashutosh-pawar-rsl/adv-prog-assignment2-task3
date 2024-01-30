require(["esri/Map", "esri/layers/CSVLayer", "esri/views/MapView", "esri/widgets/Legend"], (
  Map,
  CSVLayer,
  MapView,
  Legend
) => {
  const url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";

  const template = {
    title: "Crime Incident",
    content: "Crime occurred at {ILEADSStreet}.<br>Location: Lat {Latitude}, Lon {Longitude}."
  };

  // Heatmap renderer configuration: defines color gradient and intensity for visualizing crime density

  const renderer = {
    type: "heatmap",
    colorStops: [
      { color: "rgba(0, 255, 0, 0)", ratio: 0 },
      { color: "rgba(0, 255, 0, 1)", ratio: 0.2 },
      { color: "rgba(255, 255, 0, 1)", ratio: 0.4 },
      { color: "rgba(255, 140, 0, 1)", ratio: 0.6 },
      { color: "rgba(255, 0, 0, 1)", ratio: 0.8 },
      { color: "rgba(255, 0, 0, 1)", ratio: 1 }
    ],
    maxPixelIntensity: 150,
    minPixelIntensity: 0
  };

// CSV Layer with heatmap rendering for St. Louis crime data

  const layer = new CSVLayer({
    url: url,
    title: "St. Louis Crime Heatmap",
    copyright: "St. Louis Police Department",
    popupTemplate: template,
    renderer: renderer
  });

  const map = new Map({
    basemap: "dark-gray-vector",
    layers: [layer]
  });

  const view = new MapView({
    container: "viewDiv",
    center: [-90.1994, 38.6270], // Center on St. Louis
    zoom: 12,
    map: map
  });

  view.ui.add(
    new Legend({
      view: view
    }),
    "bottom-left"
  );
});

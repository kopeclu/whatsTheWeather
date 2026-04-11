import { useEffect } from "react";
import L from 'leaflet';
import { useMap } from "react-leaflet";

const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = new L.Control({ position: "bottomleft" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [30, 25, 20, 10, 0, -10, -20, -30, -40, -45, -55, -65];
      const colors = [
        "rgba(252, 128, 20, 0.3)",
        "rgba(255, 194, 40, 0.3)",
        "rgba(255, 240, 40, 0.3)",
        "rgba(194, 255, 40, 0.3)",
        "rgba(35, 221, 221, 0.3)",
        "rgba(32, 196, 232, 0.3)",
        "rgba(32, 140, 236, 0.3)",
        "rgba(130, 87, 219, 0.3)",
        "rgba(130, 22, 146, 0.3)",
        "rgba(130, 22, 146, 0.3)",
        "rgba(130, 22, 146, 0.3)",
        "rgba(130, 22, 146, 0.3)"
      ];

      div.innerHTML = "<h4>Temperature °C</h4>";
      for (let i = 0; i < grades.length - 1; i++) {
        div.innerHTML +=
          '<div style="background:' + colors[i] + '">' +
          grades[i] + (grades[i - 1] ? " to " + grades[i - 1] + "<br>" : "+") +
          '</div> ';
      }
      return div;
    };

    legend.addTo(map);
    return () => {
      map.removeControl(legend);
    };
  }, [map]);

  return null;
}
 
export default Legend;
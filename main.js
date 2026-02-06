const globe = Globe()(document.getElementById("globeViz"))
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
  .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png");

globe.pointsData([
  { lat: 51.5074, lng: -0.1278, size: 0.2, color: "red" },  // London
  { lat: 40.7128, lng: -74.006, size: 0.2, color: "blue" }, // NYC
]);

fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    globe.pointsData(data);
  });

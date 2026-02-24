const globe = Globe()(document.getElementById("globeViz"))
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
  .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")

  // ✨ Atmosphere glow
  .showAtmosphere(true)
  .atmosphereColor("#a53247")
  .atmosphereAltitude(0.25);

// 🌍 Auto-rotate
globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.6;

// 🎬 Smooth zoom-in on load
globe.pointOfView({ altitude: 2 }, 2000);

// Load your JSON
fetch("./data.json")
  .then(res => res.json())
  .then(data => {

    const points = data.map(d => ({
      lat: d.lat,
      lng: d.lon,  // globe.gl uses "lng"
      name: d.name,
      country: d.country,
      type: d.type,
      size: 0.15,
      color: "#a53247"
    }));

    globe
      .pointsData(points)
      .pointLabel(d => `
        <b>${d.name}</b><br/>
        ${d.type}<br/>
        ${d.country}
      `)
      .pointColor('color')
      .pointSize('size')

      // 🎯 Slightly raised pins
      .pointAltitude(0.05)

      // ✨ Smooth appearance animation
      .pointsTransitionDuration(1000);
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

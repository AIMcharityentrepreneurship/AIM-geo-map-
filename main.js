const globe = Globe()(document.getElementById("globeViz"))
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
  .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
  .autoRotate(true)
  .autoRotateSpeed(0.5);

// Load your JSON
fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    // Map your fields to what globe.gl expects
    const points = data.map(d => ({
      lat: d.lat,
      lng: d.lon,          // IMPORTANT: globe.gl uses "lng", not "lon"
      name: d.name,
      country: d.country,
      type: d.type,
      size: 0.15,
      color: d.type === "AIM staff" ? "orange" : "dodgerblue"
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
      .pointAltitude(0);
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

var mapid = L.map('mapid').setView([0, 0], 1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapid);

// L.marker([51.5, -0.09]).addTo(mapid)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();

async function getdata(){
  const result = await fetch('/weather/weatherApi');
  const json = await result.json();
  // console.log(typeof(json));
  console.log(json);

  for(let item of json){
    const marker = L.marker([item.lat, item.lon]).addTo(mapid);
    
    let txt = `The Weather here at ${item.lat}&deg;,
    ${item.lon}&deg; is ${item.weather.summary} with
    a temperature of ${item.weather.temperature}&deg; C.
    The concentration of particulate matter `;
    
    if(item.air.value > 0){  
      txt += `(${item.air.parameter}) is ${item.air.value} ${item.air.unit}
      last read on ${item.air.lastUpdated}.`;
    } else{
      txt += `No air quality reading`;
    }
    marker.bindPopup(txt);
  }

  // for (let item of json){
  //   let root = document.createElement('div');
  //   let lat = document.createElement('p');
  //   let lon = document.createElement('p');
  //   let timestamp = document.createElement('p');

  //   let date = new Date(item.timestamp);

  //   lat.textContent = `Lat: ${item.lat}`;
  //   lon.textContent = `Lon: ${item.lon}`;
  //   timestamp.textContent = 'Timestamp: ' + date.toLocaleString();

  //   root.append(lat, lon, timestamp);  
  //   document.body.append(root);

//   I'm sitting out here at °, ° on this day and it feels like ° C. outside.

// The concentration of small carcinogenic particles () I'm breathing in is measured from at on . 
  // }
  
}

getdata();
let lat, lon, weather, air;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(async (position)=>{
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    
    try{
      const result = await fetch(`climate/${lat},${lon}`);
      const json = await result.json();

      weather = json.weather.currently;
      document.getElementById('summary').textContent = weather.summary;
      document.getElementById('temperature').textContent = weather.temperature;
      
      air = json.air_quality.results[0].measurements[0];
      document.getElementById('aq_parameter').textContent = air.parameter;
      document.getElementById('aq_value').textContent = air.value;
      document.getElementById('aq_units').textContent = air.unit;
      document.getElementById('aq_date').textContent = air.lastUpdated;

    } catch (error){
      console.error(error);
      document.getElementById('aq_value').textContent = 'NO READING DATA';
      air = {value: -1};
    }

    const data = {lat, lon, weather, air}
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      console.log('envio');
      console.log(data);
      const db_result = await fetch('/weather/weatherApi', option);
      const db_json = await db_result.json();
      console.log('respuesta');
      console.log(db_json);
    
  });

} else {
  console.log('no geo');
}


// document.getElementById('sumbit').addEventListener('click', getpos);
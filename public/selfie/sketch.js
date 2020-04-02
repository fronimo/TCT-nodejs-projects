function setup(){
  const send_data = {};
  const video = createCapture(VIDEO);
  video.size(320, 240);

  let button = document.getElementById('submit');
  button.addEventListener("click", async event => {
      const mood = document.getElementById('mood').value;
      send_data.mood = mood;

      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      send_data.image64 = image64;

      const options = {
      method: 'POST',
      body: JSON.stringify(send_data),
      headers:{
          'Content-Type': 'application/json'
      }
    }

    const response = await fetch('/selfieApi', options);
    const json = await response.json();
    console.log("respuesta");
    console.log(json);
  });

  async function getPos(){
    let pos = await fetch('http://ip-api.com/json');
    let data = await pos.json();
    let {lat, lon} = data;
    
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lon;
    send_data.lat = lat;
    send_data.lon = lon;
    // console.log("send_data");
    // console.log(send_data);
  }

  if('geolocation' in navigator){
    console.log("Allowed");
    getPos();
    
  }else{
    console.log('Not Allowed');
  }
}
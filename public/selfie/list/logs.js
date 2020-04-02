async function getData(){
  const response = await fetch('/selfieApi');
  const data = await response.json();
  // console.log(data);
  
  for (item of data){
    const root = document.createElement('p');
    const mood = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');
    
    mood.textContent = `Mood: ${item.mood}`;
    geo.textContent = `Lat: ${item.lat} , Lon: ${item.lon}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = "Date: " + dateString;
    image.src = item.image64;
    image.alt = "Alfrex making silly faces."

    root.append(mood, geo, date, image);
    document.body.append(root);
  }

  
}

getData();
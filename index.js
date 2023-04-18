
const weatherData = document.querySelector('#weather-data');

document.querySelector("#weather-form").addEventListener('submit', function(e) {

  e.preventDefault();
  const location = encodeURIComponent(e.target.elements.location.value);
  getWeatherData(location);

});


const map = L.map('example').setView([33.7756222,-84.398479], 13);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 13
}).addTo(map);


function getWeatherData(location) {
  const RESULTBOX = document.getElementById("resultBox")

  const url = 'https://script.google.com/macros/s/AKfycbwLJcImpg28FbXXmyGRpe2x9D2UnCGgDM8zJeVgo2dOfyvv_P5XBJ_5pwy67ttphET4/exec'

  const data = { location };
  const OPTIONS = {
    redirect: "follow",
    method: 'POST',
    body: JSON.stringify(data)
  }
  fetch(url, OPTIONS)
    .then(response => response.json())
    .then(data => {
      try 
      {
        const lat = data.coord.lat
        const lon = data.coord.lon
        const coordinates = [lat, lon]
        
        resetMap(coordinates)
        
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(        
          RESULTBOX.innerHTML = formatHTML(data)
          )
      }
        catch (err) {
          console.log(err)
          RESULTBOX.innerHTML = err.message

      }

    })
        .catch(error => console.error(error));
        RESULTBOX.innerHTML = err.message

  
    function resetMap(coord) {
      map.setView(coord);
      map.setZoom(10);
    }
 

}

function formatHTML(data){
  return `
      <h3> ${data.name} </h3>
      <p>Temp: ${data.main.temp} &#8457;<br>
      Wind: ${data.wind.speed} mph<br>
      Description: ${data.weather[0].description}</p>
      <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`
}



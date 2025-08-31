const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

const cityCoords = {
  "dhaka": { lat: 23.8103, lon: 90.4125 },
  "chittagong": { lat: 22.3569, lon: 91.7832 },
  "khulna": { lat: 22.8456, lon: 89.5403 },
  "rajshahi": { lat: 24.3636, lon: 88.6241 }
};

searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim().toLowerCase();
  const coords = cityCoords[cityName];

  if (!coords) {
    weatherResult.innerHTML = `<p>City not found locally. Try Dhaka, Chittagong, Khulna, or Rajshahi.</p>`;
    return;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const cw = data.current_weather;
      weatherResult.innerHTML = `
        <h2>${cityName.charAt(0).toUpperCase() + cityName.slice(1)}</h2>
        <p><strong>${cw.temperature}°C</strong></p>
        <p>Wind: ${cw.windspeed} m/s</p>
        <p>Weather code: ${cw.weathercode}</p>
      `;
    })
    .catch(err => {
      weatherResult.innerHTML = `<p>Something went wrong. Please try again.</p>`;
      console.error(err);
    });
});

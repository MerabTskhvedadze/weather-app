const tempTranslator = (temp, units) => {
  const allTemps = {
    k: { value: temp, unit: "°K" },
    c: { value: temp - 273, unit: "°C" },
    f: { value: 1.8 * (temp - 273) + 32, unit: "°F" },
  };
  return units === "metric" ? allTemps.c : allTemps.f;
};
const speedTranslator = (speed, units) => {
  const allSpeed = {
    meter: { value: speed, unit: "m/s" },
    feet: { value: speed / 0.3048, unit: "ft/s" },
  };
  return units === "metric" ? allSpeed.meter : allSpeed.feet;
};

const weatherCard = (data, units) => {
  return `
    <article class="weathercard">
        <div class="weathercard__meta">
          <div class="weathercard__meta-location">
            ${data.name}, ${data.sys.country}
          </div>
        </div>
        <div class="weathercard__temp">
          <span class="temp">
            ${tempTranslator(data.main.temp, units).value.toFixed(1)}
          </span>
          <span class="tempunit">
            ${tempTranslator("", units).unit}  
          </span>
        </div>
        <div class="weathercard__wind">
          <div class="weathercard__wind-speed">
            <span class="speed">
              ${speedTranslator(data.wind.speed, units).value.toFixed(2)}
            </span>
            <span class="windunit">${speedTranslator("", units).unit}</span>
          </div>
          <div class="weathercard__wind-dir 
            ${data.wind.speed === 0 && "hidden"}" 
            style="transform:rotate(${data.wind.deg + 90}deg)">
              <span class="screen-reader-text">${data.wind.deg}</span>
          </div>
        </div>
      <button id="units">Change units</button>
    </article>
    `;
};

export default weatherCard;

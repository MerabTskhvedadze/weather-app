import settings from "./settings.js";
import weatherCard from "./components/weathercard.js";

const mainContent = document.querySelector(".main-content");
const errorMessage = document.querySelector(".error");
const locationInput = document.querySelector("#location");
const submitBtn = document.querySelector("#submit");

let units = settings.units;
let location = settings.location;

const unitChanger = () => {
  const unitsButton = document.querySelector("#units");
  unitsButton.addEventListener("click", () => {
    units === "metric" ? (units = "imperial") : (units = "metric");
    displayData(units);
  });
};
const errorHandler = (error) => {
  errorMessage.classList.remove("hidden");
  errorMessage.innerHTML = error;
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  errorMessage.classList.add("hidden");
  location = locationInput.value;
  if (location === "") {
    errorHandler("Please do not leave input field empty");
    location = settings.location;
  }
  displayData(units);
});

function displayData(units) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${settings.appid}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      mainContent.innerHTML = weatherCard(data, units);
    })
    .catch((error) => {
      errorHandler(
        "Oops! Something went wrong, Please follow the instructions"
      );
    })
    .then(() => unitChanger());
}
displayData(units);

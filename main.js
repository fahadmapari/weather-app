window.addEventListener("load", () => {
  let long;
  let lat;
  let mainContainer = document.getElementById("main-container");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".degree-section");
  let degreeSpan = document.querySelector(".degree-section span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      var api = `${proxy}https://api.darksky.net/forecast/571e19bc3ff36f820df21d034a623dfd/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          temperatureDescription.textContent = `${summary}`;
          temperatureDegree.textContent = `${temperature}`;
          locationTimezone.textContent = `${data.timezone}`;
          setIcons(icon, document.querySelector(".icon"));

          degreeSection.addEventListener("click", () => {
            if (degreeSpan.textContent === "F") {
              let temp = (temperature - 32) / 1.8;
              temperatureDegree.textContent = temp.toFixed(2);
              degreeSpan.textContent = "C";
            } else {
              temperatureDegree.textContent = temperature;
              degreeSpan.textContent = "F";
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white", resizeClear: true });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    console.log(skycons);
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

const country = document.querySelector(".country-main");
const countryInfos = document.querySelector(".country-infos");
const searchInput = document.getElementById("search");
const form = document.querySelector("form");

function showCountry(data) {
  if (searchInput.value) {
    country.innerHTML = `<p class="country-flag">${data[0].flag}</p><h3>${data[0].name.common}</h3>`;
    countryInfos.innerHTML = `<li><span>Capital: </span>${
      data[0].capital[0]
    }</li>
    <li><span>Continent: </span>${data[0].continents}</li>
    <li><span>Population: </span>${data[0].population}</li>
    <li><span>Currency: </span>${
      data[0].currencies[Object.keys(data[0].currencies)].name
    }</li>
    <li><span>Common Languages: </span>${Object.values(data[0].languages)
      .toString()
      .split(",")
      .join(", ")}</li>`;
    searchInput.value = "";
  } else {
    country.innerHTML = `<p class="alert">Please enter a valid country name.</p>`;
    countryInfos.innerHTML = "";
  }
}

form.addEventListener("submit", getMyCountry);

function getMyCountry(e) {
  e.preventDefault();
  fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      showCountry(data);
    });
}

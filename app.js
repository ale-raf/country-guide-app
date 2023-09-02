const country = document.querySelector(".country-main");
const countryInfos = document.querySelector(".country-infos");
const searchInput = document.getElementById("search");
const select = document.getElementById("countries");
const form = document.querySelector("form");

function getAllCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((countries) => {
      countries.forEach((country) => {
        const countryOption = document.createElement("option");
        countryOption.value = country.name.common;
        countryOption.innerHTML = country.name.common;
        select.appendChild(countryOption);
      });
    });
}

getAllCountries();

function showCountry(data) {
  if (select.value !== "") {
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
  } else {
    country.innerHTML = `<p class="alert">You need to select a country.</p>`;
    countryInfos.innerHTML = "";
  }
}

select.addEventListener("change", getMyCountry);

function getMyCountry(e) {
  e.preventDefault();
  fetch(`https://restcountries.com/v3.1/name/${select.value}`)
    .then((res) => res.json())
    .then((data) => {
      showCountry(data);
    });
}

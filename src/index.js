import { fetchCountries } from './css/fetchCountries';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const countryNameInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

countryNameInput.addEventListener('input', OnInputChange);

function OnInputChange(e) {
    const countryNameInputValue = e.target.value;
    fetchCountries(countryNameInputValue).then((countries) => renderCountryList(countries).catch((error) => console.log(error)));
}

function renderCountryList(countries) {
  const markup = countries
    .map((country) => {
      return `<li>
          <p><b>Name</b>: ${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
        </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
}
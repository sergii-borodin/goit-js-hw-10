import { fetchCountries } from './fetchCountries';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const countryNameInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryNameInput.addEventListener('input', OnInputChange);

function OnInputChange(e) {
    const countryNameInputValue = e.target.value;
    fetchCountries(countryNameInputValue).then((countries) => renderCountryList(countries).catch((error) => console.log(error)));
}

function renderCountryList(countries) {
    console.log(countries);

    // Markup rendering in a case when backend sends array of countries
    if (countries.length === 1) {
        const [country] = countries;
  const {name, flags, capital, population, languages} = country;
            const listMarkup = `<p><img src=${flags.png} alt="Flag of ${name}" width='20'> ${name}</p>
        <p><b>Capital</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${languages.map(language => `${language.name}`).join(",")}</p>`;
        countryList.innerHTML = '';
      countryInfo.innerHTML = listMarkup;
}
    // Markup rendering in a case when backend sends array with one single country
    else if (countries.length > 1) {
            const detailMarkup = countries.map(({name, flags}) =>
            `<li class='countryListItem'><img class='flagImage' src=${flags.png} alt="Flag of ${name}" width='20'><p>${name}</p></li>`
        )
        .join("");
        
    countryInfo.innerHTML = '';
    countryList.innerHTML = detailMarkup;
        }
}
  

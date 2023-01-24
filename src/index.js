import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { refs } from './helpers/refs';
import { renderCountryList, renderCountryCard } from './helpers/renderMarkup';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';


const DEBOUNCE_DELAY = 300;

refs.countryNameInput.addEventListener('input', debounce(OnInputChange, DEBOUNCE_DELAY));

function OnInputChange(e) {
    const inputValue = e.target.value.trim();
    console.log('inputValue', inputValue);
    if (!inputValue) {
        refs.countryCard.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
    }

    fetchCountries(inputValue).then((countries) => {
        console.log('countries', countries)
        if (countries.length > 10) {
            refs.countryCard.innerHTML = '';
            refs.countryList.innerHTML = '';
            Notify.info("Too many matches found. Please enter a more specific name.")
        }
        if (countries.length >= 2 && countries.length <= 10) {
            refs.countryCard.innerHTML = '';
            refs.countryList.innerHTML = '';
            renderCountryList(countries);
        }
        if (countries.length === 1) {
            refs.countryList.innerHTML = '';
            renderCountryCard(countries);
        }
    }).catch((error) => {
        refs.countryCard.innerHTML = '';
        refs.countryList.innerHTML = '';
        Notify.failure(`Oops, there is no country with that name ${error}`)
    });
    }




  

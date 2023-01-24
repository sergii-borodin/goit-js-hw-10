import { refs }  from "./refs";

// Markup rendering in a case when backend sends array of countries

export function renderCountryList(countries) { 
            refs.countryList.innerHTML = countries.map(({name, flags: {png}}) =>
            `<li class='countryListItem'><img class='flagImage' src=${png} alt="Flag of ${name}" width='20'><p>${name}</p></li>`
        )
        .join("");
        }

    // Markup rendering in a case when backend sends array with one single country

    export function renderCountryCard(countries) {
        const [country] = countries;
        const { name, flags, capital, population, languages } = country;
        const listMarkup = `<p><img src=${flags.png} alt="Flag of ${name}" width='20'> ${name}</p>
        <p><b>Capital</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${languages.map(language => `${language.name}`).join(",")}</p>`;
        refs.countryCard.innerHTML = listMarkup;
    }

    
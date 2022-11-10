import './css/styles.css';
import {fetchCountries} from "./fetchCountries";
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';



// fetchCountries('ukraine');
const searchBox = document.getElementById('search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY));

function getCountry(evt) {
    countryInfo.innerHTML = ' ';
    countryList.innerHTML = ' ';
    let inputValue = evt.target.value.trim();
    if(!inputValue){
        return;
    } 
    fetchCountries(inputValue)
    .then(json => {
        let markup = '';
        if(json.length > 10) {
            return Notify.info('Too many matches found. Please enter a more specific name.');
          } else if (json.length >= 2 && json.length <= 10){
            markup = '';
            json.map (element => {
                markup =+ 
                `
              <li class=country-item>
                <img src=${json.flags.svg} alt=${json.name.official} width=40px/>
                <p>${json.name.official}</p>
              </li>
                `
                
            })
          }else if(json.length === 1) {
            markup = '';
            json.map (element => {
                markup =+ 
                `<div class=blok>
                <div class=country-info>
                    <img src=${flags.svg} alt=${json.name.official} width=40px/>
                    <p class=country-name> ${json.name.official}</p>
                </div>
                <ul>
                    <li class=country-item>
                        <p><b>Capital:</b></p> ${capital}</li>
                    <li class=country-item>
                        <p><b>Population:</b></p> ${population}</li>
                    <li class=country-item>
                        <p><b>Languages:</b></p> ${Object.values(languages)}</li>
                </ul>
                </div>
                `
            })
          };
            
    })
    }
   
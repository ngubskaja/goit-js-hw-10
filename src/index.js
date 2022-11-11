import './css/styles.css';
import {fetchCountries} from "./fetchCountries";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';



// fetchCountries('');
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
                <img src=${element.flags.svg} alt=${element.name.official} width=40px/>
                <p>${element.name.official}</p>
              </li>
                `
                
            })
          }else if(json.length === 1) {
            markup = '';
            json.map (element => {
                markup =+ 
                `<div class=blok>
                <div class=country-info>
                    <img src=${element.flags.svg} alt=${element.name.official} width=40px/>
                    <p class=country-name> ${element.name.official}</p>
                </div>
                <ul>
                    <li class=country-item>
                        <p><b>Capital:</b></p> ${element.capital}</li>
                    <li class=country-item>
                        <p><b>Population:</b></p> ${element.population}</li>
                    <li class=country-item>
                        <p><b>Languages:</b></p> ${Object.values(element.languages)}</li>
                </ul>
                </div>
                `
            })
          };
            
    })
    }
   
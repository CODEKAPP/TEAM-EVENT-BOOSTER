import arrow from './js/arrow'
import config from './js/config'
import modal from './js/modal'
import paises from './js/paises'
import render from './js/render'
import renderEvents from './js/renderEvents'
import renderPagination from './js/renderPagination'
import search from './js/search'
import utils from './js/utils'

// Importar las variables de configuración desde el archivo "./config"
import { fetchEventsName, fetchEvents2 } from './js/search';
import { selecPaises } from './js/paises';

// Petición de eventos

const select = document.querySelector('.header__inputs-2');

for (let i = 0; i < selecPaises.length; i++) {
  let opcion = document.createElement('option');
  opcion.value = selecPaises[i].clave;
  opcion.text = selecPaises[i].nombre;
  select.appendChild(opcion);
}

const input = document.querySelector('.header__inputs-1');
let pageNumber = 1;

input.addEventListener('blur', () => {
  let searhInput = document.querySelector('.header__inputs-1').value;
  // console.log(searhInput)
  searchPais = '*';
  //fetchEventsName(searhInput, searchPais, pageNumber);
  const options = {
    countryCode: 'US',
    keyword: searhInput,
  };
  fetchEvents2(pageNumber, options);
});

select.addEventListener('change', () => {
  let searhInput = document.querySelector('.header__inputs-1').value;
  let searchPais = document.querySelector('.header__inputs-2').value;
  // console.log(searhInput)
  // console.log(searchPais)
  //fetchEventsName(searhInput, `en-${searchPais}`, pageNumber);
  const options = {
    countryCode: searchPais.toUpperCase(),
    keyword: searhInput,
  };
  fetchEvents2(pageNumber, options);
});

import { API_URL, API_KEY } from './config';
import { formatEvents } from './utils';
import { renderEvents } from './renderEvents';
import { renderPagination, pageSize } from './renderPagination';
import Notiflix from 'notiflix';

// Función para buscar eventos por nombre, país y número de página
export async function fetchEventsName(searchInput, searchPais, pageNumber) {
  // Crea un objeto URLSearchParams para construir los parámetros de la URL de la API
  const queryParams = new URLSearchParams({
    keyword: searchInput,
    apikey: API_KEY,
    locale: searchPais,
    includeImages: 'yes',
    size: pageSize,
    page: pageNumber,
  });

  try {
    // Realiza una solicitud de red a la API utilizando la URL de la API y los parámetros de búsqueda
    const response = await fetch(`https://${API_URL}?${queryParams}`);
    const data = await response.json(); // Convierte la respuesta en formato JSON

    const totalElements = data.page.totalElements; // Obtiene el número total de eventos encontrados

    if (totalElements === 0) {
      // Si no se encontraron eventos, muestra una notificación de error utilizando Notiflix
      Notiflix.Notify.failure(`No se encontraron eventos para esta búsqueda`);
    } else {
      // Si se encontraron eventos, los formatea y muestra en la página
      const events = formatEvents(data._embedded.events); // Formatear los eventos
      const totalPages = Math.ceil(data.page.totalElements / pageSize); // Calcula el número total de páginas
      let currentPage = 1; // Página actual (inicialmente establecida en 1)
      renderEvents(events); // Renderiza los eventos en la página
      renderPagination(totalPages, currentPage); // Renderiza la paginación en la página
    }
  } catch (error) {
    console.log(error); // Si ocurre algún error durante la solicitud o el procesamiento de datos, se muestra en la consola
  }
}

// Función para buscar eventos por número de página y opciones adicionales
export async function fetchEvents2(pageNumber, options) {
  const queryParams = new URLSearchParams({
    apikey: API_KEY,
    countryCode: options.countryCode ?? 'US',
    keyword: options.keyword ?? '',
    includeImages: 'yes',
    size: pageSize,
    page: pageNumber,
  });

  try {
    const response = await fetch(`https://${API_URL}?${queryParams}`);
    const data = await response.json();

    const totalElements = data.page.totalElements;

    if (totalElements === 0) {
      Notiflix.Notify.failure(`No se encontraron eventos para esta búsqueda`);
    } else {
      const events = formatEvents(data._embedded.events);
      const totalPages = Math.ceil(data.page.totalElements / pageSize);
      let currentPage = 1;
      renderEvents(events);
      renderPagination(totalPages, currentPage);
    }
  } catch (error) {
    console.log(error);
  }
}

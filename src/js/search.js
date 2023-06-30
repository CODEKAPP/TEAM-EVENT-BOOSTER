// import { API_URL, API_KEY } from './config';
// import { formatEvents } from './utils';
// import { renderEvents } from './renderEvents';
// import { renderPagination, pageSize } from './renderPagination';
// import Notiflix from 'notiflix';

// // Función para buscar eventos por nombre, país y número de página
// export async function fetchEventsName(searchInput, searchPais, pageNumber) {
//   // Crea un objeto URLSearchParams para construir los parámetros de la URL de la API
//   const queryParams = new URLSearchParams({
//     keyword: searchInput,
//     apikey: API_KEY,
//     locale: searchPais,
//     includeImages: 'yes',
//     size: pageSize,
//     page: pageNumber,
//   });

//   try {
//     // Realiza una solicitud de red a la API utilizando la URL de la API y los parámetros de búsqueda
//     const response = await fetch(`https://${API_URL}?${queryParams}`);
//     const data = await response.json(); // Convierte la respuesta en formato JSON

//     const totalElements = data.page.totalElements; // Obtiene el número total de eventos encontrados

//     if (totalElements === 0) {
//       // Si no se encontraron eventos, muestra una notificación de error utilizando Notiflix
//       Notiflix.Notify.failure(`No se encontraron eventos para esta búsqueda`);
//     } else {
//       // Si se encontraron eventos, los formatea y muestra en la página
//       const events = formatEvents(data._embedded.events); // Formatear los eventos
//       const totalPages = Math.ceil(data.page.totalElements / pageSize); // Calcula el número total de páginas
//       let currentPage = 1; // Página actual (inicialmente establecida en 1)
//       renderEvents(events); // Renderiza los eventos en la página
//       renderPagination(totalPages, currentPage); // Renderiza la paginación en la página
//     }
//   } catch (error) {
//     console.log(error); // Si ocurre algún error durante la solicitud o el procesamiento de datos, se muestra en la consola
//   }
// }

// // Función para buscar eventos por número de página y opciones adicionales
// export async function fetchEvents2(pageNumber, options) {
//   const queryParams = new URLSearchParams({
//     apikey: API_KEY,
//     countryCode: options.countryCode ?? 'US',
//     keyword: options.keyword ?? '',
//     includeImages: 'yes',
//     size: pageSize,
//     page: pageNumber,
//   });

//   try {
//     const response = await fetch(`https://${API_URL}?${queryParams}`);
//     const data = await response.json();

//     const totalElements = data.page.totalElements;

//     if (totalElements === 0) {
//       Notiflix.Notify.failure(`No se encontraron eventos para esta búsqueda`);
//     } else {
//       const events = formatEvents(data._embedded.events);
//       const totalPages = Math.ceil(data.page.totalElements / pageSize);
//       let currentPage = 1;
//       renderEvents(events);
//       renderPagination(totalPages, currentPage);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }


// import { API_URL, API_KEY } from './config';
// import { renderEvents } from './renderEvents';
// import { renderPagination, pageSize } from './renderPagination';
// import Notiflix from 'notiflix';

// // Función para formatear los eventos y extraer la información necesaria
// function formatEvents(events) {
//   return events.map(event => {
//     const defaultImageUrl = 'https://via.placeholder.com/150'; // URL de imagen por defecto
//     let imageUrl = defaultImageUrl; // Variable para almacenar la URL de la imagen
//     let eventInfo = ''; // Variable para almacenar la información del evento

//     // Comprobación de las imágenes del evento
//     if (event.images && event.images.length > 0) {
//       for (let image of event.images) {
//         if (image.url) {
//           imageUrl = image.url; // Asignar la primera URL de imagen válida encontrada
//           break; // Escapar del bucle una vez que se encuentre una URL de imagen válida
//         }
//       }
//     }

//     // Comprobación de la información del evento
//     if (event.info) {
//       eventInfo = event.info; // Asignar la información del evento si está disponible
//     }

//     // Devolver un objeto con la información formateada del evento
//     return {
//       name: event.name,
//       date: event.dates.start.localDate,
//       dateTimes: event.dates.start.localTime + ' ' + event.dates.timezone,
//       place: event._embedded.venues[0].name,
//       image: imageUrl,
//       info: eventInfo,
//     };
//   });
// }

// // Función para obtener eventos de la API
// function fetchEvents(pageSize, pageNumber) {
//   const queryParams = new URLSearchParams({
//     apikey: API_KEY,
//     locale: '*',
//     includeImages: 'yes',
//     size: pageSize,
//     page: pageNumber,
//   });

//   return fetch(`https://${API_URL}?${queryParams}`)
//     .then(response => response.json()) // Convertir la respuesta a JSON
//     .then(data => {
//       const events = formatEvents(data._embedded.events); // Formatear los eventos obtenidos
//       const totalPages = Math.ceil(data.page.totalElements / pageSize); // Calcular el número total de páginas
//       return { events, totalPages }; // Devolver un objeto con los eventos formateados y el número total de páginas
//     })
//     .catch(error => {
//       console.log(error); // Mostrar el error en la consola
//       throw new Error('Error al obtener los eventos'); // Lanzar una excepción con un mensaje de error
//     });
// }

// // Función para buscar eventos por nombre, país y número de página
// export async function fetchEventsName(searchInput, searchPais, pageNumber) {
//   // Crea un objeto URLSearchParams para construir los parámetros de la URL de la API
//   const queryParams = new URLSearchParams({
//     keyword: searchInput,
//     apikey: API_KEY,
//     locale: searchPais,
//     includeImages: 'yes',
//     size: pageSize,
//     page: pageNumber,
//   });

//   try {
//     // Realiza una solicitud de red a la API utilizando la URL de la API y los parámetros de búsqueda
//     const response = await fetch(`https://${API_URL}?${queryParams}`);
//     const data = await response.json(); // Convierte la respuesta en formato JSON

//     const totalElements = data.page.totalElements; // Obtiene el número total de eventos encontrados

//     if (totalElements === 0) {
//       // Si no se encontraron eventos, muestra una notificación de error utilizando Notiflix
//       Notiflix.Notify.failure(`No se encontraron eventos para esta búsqueda`);
//     } else {
//       // Si se encontraron eventos, los formatea y muestra en la página
//       const events = formatEvents(data._embedded.events); // Formatear los eventos
//       const totalPages = Math.ceil(data.page.totalElements / pageSize); // Calcula el número total de páginas
//       let currentPage = 1; // Página actual (inicialmente establecida en 1)
//       renderEvents(events); // Renderiza los eventos en la página
//       renderPagination(totalPages, currentPage); // Renderiza la paginación en la página
//     }
//   } catch (error) {
//     console.log(error); // Si ocurre algún error durante la solicitud o el procesamiento de datos, se muestra en la consola
//   }
// }

// // Función para buscar eventos por número de página y opciones adicionales
// export async function fetchEvents2(pageNumber, options) {
//   const queryParams = new URLSearchParams({
//     apikey: API_KEY,
//     countryCode: options.countryCode ?? 'US',
//     keyword: options.keyword ?? '',
//     includeImages: 'yes',
//     size: pageSize,
//     page: pageNumber,
//   });

//   try {
//     const response = await fetch(`https://${API_URL}?${queryParams}`);
//     const data = await response.json();

//     const totalElements = data.page.totalElements;

//     if (totalElements === 0) {
//       Notiflix.Notify.failure(`No se encontraron eventos para esta búsqueda`);
//     } else {
//       const events = formatEvents(data._embedded.events);
//       const totalPages = Math.ceil(data.page.totalElements / pageSize);
//       let currentPage = 1;
//       renderEvents(events);
//       renderPagination(totalPages, currentPage);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }


import { API_URL, API_KEY } from './config';
import { renderEvents } from './renderEvents';
import { renderPagination } from './renderPagination';
import Notiflix from 'notiflix';

// Función para formatear los eventos y extraer la información necesaria
function formatEvents(events) {
  return events.map(event => {
    const defaultImageUrl = 'https://via.placeholder.com/150'; // URL de imagen por defecto
    let imageUrl = defaultImageUrl; // Variable para almacenar la URL de la imagen
    let eventInfo = ''; // Variable para almacenar la información del evento

    // Comprobación de las imágenes del evento
    if (event.images && event.images.length > 0) {
      for (let image of event.images) {
        if (image.url) {
          imageUrl = image.url; // Asignar la primera URL de imagen válida encontrada
          break; // Escapar del bucle una vez que se encuentre una URL de imagen válida
        }
      }
    }

    // Comprobación de la información del evento
    if (event.info) {
      eventInfo = event.info; // Asignar la información del evento si está disponible
    }

    // Devolver un objeto con la información formateada del evento
    return {
      name: event.name,
      date: event.dates.start.localDate,
      dateTimes: event.dates.start.localTime + ' ' + event.dates.timezone,
      place: event._embedded.venues[0].name,
      image: imageUrl,
      info: eventInfo,
    };
  });
}

// Función para obtener eventos de la API
function fetchEvents(pageSize, pageNumber) {
  const queryParams = new URLSearchParams({
    apikey: API_KEY,
    locale: '*',
    includeImages: 'yes',
    size: pageSize,
    page: pageNumber,
  });

  return fetch(`https://${API_URL}?${queryParams}`)
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
      const events = formatEvents(data._embedded.events); // Formatear los eventos obtenidos
      const totalPages = Math.ceil(data.page.totalElements / pageSize); // Calcular el número total de páginas
      return { events, totalPages }; // Devolver un objeto con los eventos formateados y el número total de páginas
    })
    .catch(error => {
      console.log(error); // Mostrar el error en la consola
      throw new Error('Error al obtener los eventos'); // Lanzar una excepción con un mensaje de error
    });
}

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

// Obtener referencia a la galería
const gallery = document.querySelector('.gallery');

// Configuración de paginación
const pageSize = 16; // Cantidad por página inicial
let currentPage = 1;
let totalPages = 1;

// Función para inicializar la aplicación
function initializeApp() {
  fetchEvents(pageSize, currentPage)
    .then(data => {
      totalPages = data.totalPages;
      renderEvents(data.events);
      renderPagination(totalPages, currentPage);
    })
    .catch(error => {
      console.log(error);
    });
}

// Inicializar la aplicación al cargar la página
window.addEventListener('load', initializeApp);

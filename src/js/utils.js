import { API_URL, API_KEY } from './config';

// Función para formatear los eventos y extraer la información necesaria
export function formatEvents(events) {
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
export function fetchEvents(pageSize, pageNumber) {
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

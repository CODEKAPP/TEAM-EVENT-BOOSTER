const API_URL = `app.ticketmaster.com/discovery/v2/events`
const API_KEY = 'lFVCR65Z8sa3CM5tWviQtp768vaQKovb'
let render = [];

const arrayEvents = [];
const arrayEventsName = [];
const arrayPais = [];

//Petición de eventos
export function fetchEvents() {
    fetch(`https://${API_URL}?apikey=${API_KEY}&` + new URLSearchParams({
        // api_key: API_KEY,
        locale: '*',
        // page: 1,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }))
        .then(response => response.json())
        .then((data) => {
            render = data;
            console.log(render);
            //Recorrer el objeto render para obtener los eventos
            for (let value in render) {
                if (arrayEvents.length === 1) {
                    continue;
                }else{
                    const evento = render._embedded.events;
                    arrayEvents.push(evento);
                }
            }
            //Recorrer los eventos para obtener el nombre y agregarlo al array
            // console.log(arrayEvents);
            for(let event of arrayEvents[0]){
                arrayEventsName.push(event.name);
                arrayPais.push(event.locale);
                // console.log("Evento:", event.name)
            }
            console.log(arrayEventsName)
            console.log(arrayPais);
        })
        .catch((error) => {
            console.log(error);
        })
}


// export function fetchPais() {
//     fetch(`https://${API_URL}?apikey=${API_KEY}&` + new URLSearchParams({
//         // api_key: API_KEY,
//         locale: '*',
//         // page: 2,
//         // page: 3,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//     }))
//         .then(response => response.json())
//         .then((data) => {
//             render = data;
//             // console.log(render);
//             for (let value in render) {
//                 if (arrayEvents.length === 1) {
//                     continue;
//                 }else{
//                     const evento = render._embedded.events;
//                     arrayEvents.push(evento);

//                 }
//             }
//             // console.log(arrayEvents);
//             for(let event of arrayEvents[0]){
//                 arrayPais.push(event.locale)
//                 // console.log("País:", event.locale)
//             }
//             console.log(arrayPais);
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }

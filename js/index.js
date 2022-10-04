//Importaciones de archivos
import { principalCards } from "./planitlla.js";
import { secundaryCards } from "./plantillaSecundaria.js"



//constantes globales
const d = document;
const style = d.documentElement.style;
const key = '332ea3116732c536f6f7f96e8a9e5cae';
const $today = d.querySelector('#today');
const $citysfavs = d.querySelector('#citysfav')
const $nameCity = d.querySelector('#namecity');
const $btnSearch = d.querySelector('#btnsearh');
const $btnAddFav = d.querySelector('#btnaddfav')
const $btnFav = d.querySelector('#btnfav');
const $selectCity = d.querySelector('#selectcity');
const $background = d.querySelector('#background');
const $day2 = d.querySelector('#day2');
const $day3 = d.querySelector('#day3');
const $day4 = d.querySelector('#day4');
const $day5 = d.querySelector('#day5');
const DateTime = luxon.DateTime;


//Escucha de carga de la ventana para autoejecutar el pedido a la API con geolocalizacion, para que te muestre el clima desde donde estas ubicado.
window.addEventListener('load',()=>{
    
    let lon;
    let lat;
    let url;
    navigator.geolocation.getCurrentPosition( posicion => {
                       
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            //opcion paga para obtener 16 dias
            //url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon={${lon}&cnt=5&appid=${key}`

            url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=sp&`;
            loadData(url);
            
        })
    
})

// Funcion principal para el pedido de la API y que devuelva el clima del lugar que buscaste en el input.
async function loadData(url) {

    try{
        const resp = await fetch(url);
        const data = await resp.json();
        //console.log(data)
        const city = data?.city?.name || 'Ciudad no encontrada';
        $nameCity.innerHTML = city;
        
        $today.innerHTML =principalCards({...formatData(data, 0), date: datesInCards(0)});
        $day2.innerHTML = secundaryCards({...formatData(data, 7), date: datesInCards(24)});
        $day3.innerHTML = secundaryCards({...formatData(data, 15), date: datesInCards(48)});
        $day4.innerHTML = secundaryCards({...formatData(data, 25), date: datesInCards(72)});
        $day5.innerHTML = secundaryCards({...formatData(data, 39), date: datesInCards(96)});
        
        formatData(data, 0);
    }

    catch(error){
        console.error(`Error en la busqueda de la ciudad. Ciudad no encontrada. Error: ${error}`);
        
    

    }
}


//Funcion de luxon para obtener las fechas que se muestran en cada card
const datesInCards = (moment) => {
    const dt = DateTime.now();    
    const date = dt.plus({ hours: moment}).toFormat("dd LLL");
    return date;
    
}

//Funcion para formatear la data que me devuelve la api del clima
const formatData = (data, index) =>{
    
    const temp = data.list[index].main?.temp.toFixed(1) || 'sin dato';
    const feelTemp = data.list[index].main?.feels_like.toFixed(1) || 'sin dato';
    const tempMax = data.list[index].main?.temp_max.toFixed(1) || 'sin dato';
    const tempMin = data.list[index].main?.temp_min.toFixed(1)|| 'sin dato';
    const humedity = data.list[index].main?.humidity || 'sin dato';
    const sunrise = msToTime(data.city.sunrise) || 'sin dato;'
    const sunset = msToTime(data.city.sunset) || 'sin dato';
    const wind = degWind(data.list[index].wind.deg) || 'sin dato';
    const speedWind = (data.list[index].wind.speed * 3.6).toFixed(1) || 'sin dato';    
    const description = capitalizarPrimeraLetra(data.list[index].weather[0].description);
    

    let iconImg = '';
    //Con un switch modifico los iconos animados y tambien cambio el background del body acorde este el clima
    switch (data.list[index].weather[0].main) {
        case 'Thunderstorm':
            iconImg='./assets/logos/animated/thunder.svg'  
            changeColorFontAndBakground('#f3f3f3', 'invert(0.94)', 'Thunderstorm') 
            //console.log('TORMENTA');
          break;
        case 'Drizzle':
            iconImg='./assets/logos/animated/rainy-2.svg'
            changeColorFontAndBakground('#323232', 'invert(0)','Drizzle') 
            //console.log('LLOVIZNA');    
          break;
        case 'Rain':
            iconImg='./assets/logos/animated/rainy-7.svg'
            changeColorFontAndBakground('#f3f3f3', 'invert(0.94)', 'Rain')
            //console.log('LLUVIA');
          break;
        case 'Snow':
            iconImg='./assets/logos/animated/snowy-6.svg'            
            changeColorFontAndBakground('#323232', 'invert(0)', 'Snow') 
            //console.log('NIEVE');
          break;                        
        case 'Clear':
            iconImg='./assets/logos/animated/day.svg'            
            changeColorFontAndBakground('#3d3d3d', 'invert(0)','Clear')            
            //console.log('LIMPIO');
          break;
        case 'Atmosphere':
            iconImg='./assets/logos/animated/weather.svg'
            changeColorFontAndBakground('#3d3d3d', 'invert(0)','Clear') 
            //console.log('ATMOSFERA');
            break;  
        case 'Clouds':
            iconImg='./assets/logos/animated/cloudy-day-1.svg'            
            changeColorFontAndBakground('#323232', 'invert(0)','Clouds')            
            //console.log('NUBES');
            break;  
        default:
            iconImg='./assets/logos/animated/cloudy-day-1.svg'
            //console.log('por defecto');
      }
      return {temp,feelTemp,tempMax,tempMin,humedity,description,iconImg,sunrise,sunset, wind, speedWind};
}


//Funcion para cambiar el color de la fuente y fondo aorde al clima de hoy
const changeColorFontAndBakground = (colorFont, filter, background) => {
    $background.className = background
    style.setProperty('--color-letra', colorFont)
    style.setProperty('--filtro', filter)
}

//Funcion para poner la primer letra de las ciudades en mayus.
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


//Funsion para pasar de grados a direccion de donde proviene el viento.
const degWind = (deg) => {
    let wind='';
    if(deg >= 337.5 && deg <= 22.5){
        wind = 'Norte'
    }
    else if(deg >= 22.6 && deg <= 67.5){
        wind = 'Noreste'
    }
    else if(deg >= 67.6 && deg <= 112.5){
        wind = 'Este'
    }
    else if(deg >= 112.6 && deg <= 157.5){
        wind = 'Sureste'
    }
    else if(deg >= 157.6 && deg <= 202.5){
        wind = 'Sur'
    }
    else if(deg >= 202.6 && deg <= 247.5){
        wind = 'Suroeste'
    }
    else if(deg >= 247.6 && deg <= 292.5){
        wind = 'Oeste'
    }
    else{
        wind = 'Noroeste'
    }
    return wind
}


//Funcion para convertir milisegundos en horas y minutos
const msToTime = (duration) => {

    const date = new Date(duration * 1000);
    let hours = '';
    hours < 10 ? hours = "0" + date.getHours() : hours = date.getHours()
    const minutes = "0" + date.getMinutes();    

    return `${hours.substr(-2)}:${minutes.substr(-2)}`
    
}


//Creo una escucha sobre el boton de busqueda para tomar el valor del input y envio directamente la url a la peticion fetch
 $btnSearch.addEventListener('click',(e)=>{
    e.preventDefault();
    let chosenCity = $selectCity.value;
    let url=''
    chosenCity == ''
        ?Swal.fire({
            title: 'Error!',
            position: 'top',
            text: 'Ingrese una ciudad a buscar',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
    
        :url = `https://api.openweathermap.org/data/2.5/forecast?q=${chosenCity}&appid=${key}&units=metric&lang=sp`
        
    loadData(url);
    
})


//Escucha para agregar a favoritos una ciudad
$btnAddFav.addEventListener('click',(e)=>{
    e.preventDefault();
    let chosenCity = $nameCity.textContent;  
    chosenCity === 'Ciudad no encontrada'
    ? Swal.fire({
        title: 'Error!',
        position: 'top',
        text: 'No se puede guardad una ciudad no encontrada',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })    
    : addFavorites(chosenCity)
    
})

//funcion para guardar en el localStorage
const saveStorage = (favoriteCitys) => {
    localStorage.setItem("favCitys", JSON.stringify(favoriteCitys));
}

//funcion para obtener info del localStorage
const loadStorage = () => {    
    let localStorageData = JSON.parse(localStorage.getItem("favCitys"))    
    return localStorageData
}

//Funcion para el agregado de la ciudad al array de lista de ciudades favoritas
let favoriteCitys = [];
let load = loadStorage()

if(load != null){
    favoriteCitys = load
}

const addFavorites= (newFav) => {        
    if(newFav == '' || newFav == null){
        Swal.fire({
            title: 'Error!',
            position: 'top',
            text: 'Debe ingresar una ciudad a guardad en favoritos',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
    }
    else{
        if(newFav != ''){
            const cityRep = favoriteCitys.filter((city)=> city==newFav)
            console.log(cityRep)
            if(cityRep[0] === newFav){
                Swal.fire({
                    title: 'Aviso!',
                    position: 'top',
                    text: 'Esta ciudad ya esta guardada en favoritos',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                  })
            }
            else{
                favoriteCitys.push(newFav);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `Ciudad ${newFav} Guardada en favoritos!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            
            
        };
    }
    
    saveStorage(favoriteCitys)
    
};


//Escucha para ver la lista de ciudades favoritas
$btnFav.addEventListener('click',(e)=>{
    e.preventDefault();

    
    seeCitysFavs(loadStorage());

    
})

    
//funion para rear la lista de ciudades favoritas
const seeCitysFavs = (favoriteCitys) =>{    
    if(favoriteCitys.length >0 ){
        const $citysfavs = d.querySelector('#citysfav')    
        $citysfavs.innerHTML= ''
        favoriteCitys.forEach(city => {        
        $citysfavs.innerHTML+= listCitys(city)            
        });
    }
    else{
        const $citysfavs = d.querySelector('#citysfav')    
        $citysfavs.innerHTML= ''
        //const mensageHTML = document.createElement("div");
        $citysfavs.innerHTML= `<div>No hay ciudades guardadas en favoritos</div>`
    }
    
    
};

//Funcion que crea el HTML que se inserta en la lista de ciudades favoritas.
const listCitys = (city) =>{
    
    let cityfav = `
        <div class="box_citySfav" >
            <div class="cityfav" >
                <button id="${city} type="button" data-city="${city}" data-bs-dismiss="modal" class="btn-city" value="${city}">${city}</button> 
            </div>
            <div class="btnsdelete" >            
                <button id="delete_${city}" data-delete="${city}" type="button" class="btn btn-danger">Borrar</button>          
            </div>
        
        </div>
    `
    return cityfav
} 
    


//Escucha para seleccionar la ciudad de la lista de favoritos y se cargue la data de la ciudad seleccionada
$citysfavs.addEventListener('click', (e)=>{
    e.preventDefault()
    if(e.target.value != '' && e.target.getAttribute("data-city")){
        let chosenCity = e.target.value;
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${chosenCity}&appid=${key}&units=metric&lang=sp`
        loadData(url)
    }
    
})

//Escucha para borrar las ciudades de favoritos
$citysfavs.addEventListener('click', (e)=>{

    e.preventDefault()

    if(e.target && e.target.getAttribute("data-delete")){
        Swal.fire({
            title: 'Estas seguro de eliminar la ciudad de favoritos?',
            text: "Se eliminara la ciudad guardada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            position: 'top',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
                const btnDelete = e.target.id
                const id = btnDelete.split('_')[1]
                favoriteCitys = favoriteCitys.filter((city)=> city != id)
                seeCitysFavs(favoriteCitys)
                saveStorage(favoriteCitys)
                
            }
        })
   } 

})



























        
    
    

 















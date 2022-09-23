//Importaciones de archivos
import { principalCards } from "./planitlla.js";
import { secundaryCards } from "./plantillaSecundaria.js"

//constantes globales
const d = document;
const key = '332ea3116732c536f6f7f96e8a9e5cae'
const $today = d.querySelector('#today');
const $tomorrow = d.querySelector('#tomorrow');
const $nameCity = d.querySelector('#namecity');
const $btnSearch = d.querySelector('#btnsearh');
const $btnFav = d.querySelector('#btnfav');
const $selectCity = d.querySelector('#selectcity');
const $background = d.querySelector('#background')
const $day3 = d.querySelector('#day3')
const $day4 = d.querySelector('#day4')
const $day5 = d.querySelector('#day5')
const DateTime = luxon.DateTime;


//Escucha de carga de la ventana para autoejecutar el pedido a la API con geolocalizacion, para que te muestre el clima desde donde estas ubicado.
window.addEventListener('load',()=>{
    
    let lon
    let lat
    let url
    navigator.geolocation.getCurrentPosition( posicion => {
                       
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=sp&cnt=5`
            loadData(url)
            
        })
    
})

// Funcion principal para el pedido de la API y que devuelva el clima del lugar que buscaste en el input.
async function loadData(url) {

    try{
        const resp = await fetch(url);
        const data = await resp.json();
        
        const city = data?.city?.name || 'Ciudad no encontrada'
        $nameCity.innerHTML = city
        
        $today.innerHTML =principalCards({...formatData(data, 0), date: datesInCards(0), moment: 'Hoy'});
        $tomorrow.innerHTML =principalCards({...formatData(data, 1), date: datesInCards(24), moment: 'Mañana'});
        $day3.innerHTML = secundaryCards({...formatData(data, 2), date: datesInCards(48)})
        $day4.innerHTML = secundaryCards({...formatData(data, 3), date: datesInCards(72)})
        $day5.innerHTML = secundaryCards({...formatData(data, 4), date: datesInCards(96)})
        
        formatData(data, 0)
    }

    catch(error){
        console.error(`Error: ${error}`)
    }
}


//Funcion de luxon para obtener las fechas que se muestran en cada card
const datesInCards = (moment) => {
    const dt = DateTime.now()    
    const date = dt.plus({ hours: moment}).toFormat("dd LLL")
    return date
    
}


//Funcion para formatear la data que me devuelve la api del clima
const formatData = (data, index) =>{
    const temp = data.list[index].main?.temp.toFixed(1) || 'sin dato';
    const tempMax = data.list[index].main?.temp_max.toFixed(1) || 'sin dato';
    const tempMin = data.list[index].main?.temp_min.toFixed(1)|| 'sin dato';
    const humedity = data.list[index].main?.humidity || 'sin dato';
    const description = capitalizarPrimeraLetra(data.list[index].weather[0].description);
    
    let iconImg = '';
    //Con un switch modifico los iconos animados y tambien cambio el background del body acorde este el clima
    switch (data.list[index].weather[0].main) {
        case 'Thunderstorm':
            iconImg='./assets/logos/animated/thunder.svg'            
            $background.className = 'Thunderstorm'
            
            //console.log('TORMENTA');
          break;
        case 'Drizzle':
            iconImg='./assets/logos/animated/rainy-2.svg'
            $background.className = 'Drizzle' 
            //console.log('LLOVIZNA');            
            
          break;
        case 'Rain':
            iconImg='./assets/logos/animated/rainy-7.svg'
            $background.className = 'Rain' 
            //console.log('LLUVIA');            
            
          break;
        case 'Snow':
            iconImg='./assets/logos/animated/snowy-6.svg'
            $background.className = 'Snow' 
            //console.log('NIEVE');
          break;                        
        case 'Clear':
            iconImg='./assets/logos/animated/day.svg'
            $background.className = 'Clear'
            
            //console.log('LIMPIO');
          break;
        case 'Atmosphere':
            iconImg='./assets/logos/animated/weather.svg'
            $background.className = 'Atmosphere'
            //console.log('ATMOSFERA');
            break;  
        case 'Clouds':
            iconImg='./assets/logos/animated/cloudy-day-1.svg'
            $background.className = 'Clouds'
            //console.log('NUBES');
            break;  
        default:
            iconImg='./assets/logos/animated/cloudy-day-1.svg'

            //console.log('por defecto');
      }
      return {temp,tempMax,tempMin,humedity,description,iconImg};
}


//Funcion para poner la primer letra de las ciudades en mayus.
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};




//Creo una escucha sobre el boton de busqueda para tomar el valor del input y envio directamente la url a la peticion fetch
 $btnSearch.addEventListener('click',(e)=>{
    e.preventDefault();
    let chosenCity = $selectCity.value;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${chosenCity}&appid=${key}&units=metric&lang=sp&cnt=5`
    console.log(chosenCity);
    loadData(url);

    
})




//Agrego boton para ejecutar el menu para agregar ciudades como favoritas
$btnFav.addEventListener('click',(e)=>{
    e.preventDefault();    

    let favoriteCitys = [];
    let favoriteCitysInMemory = JSON.parse(localStorage.getItem("favCitys"));
    
    favoriteCitysInMemory == '' ? favoriteCitys = [] : favoriteCitys = favoriteCitysInMemory 

    let newFav='';
    
    let listCitysFavs = '';
    
    //Bloque de funciones
    
    //Fuencion para agregar a favoritos
    const addFavorites= (newFav) => {        
        if(newFav == '' || newFav == null){
            alert('Ingreso no valido. Debe indicar un nombre o "ESC" para finalizar')
        }
        else{
            if(newFav != 'ESC'){
                favoriteCitys.push(newFav);
                alert (`Ciudad ${newFav} agregada`);
                localStorage.setItem("favCitys", JSON.stringify(favoriteCitys));
            };
            
        }
        
    };
    //Funciona para ver lista de favoritos
    
    const seeCitysFavs = (favoriteCitys) =>{
        
        
        listCitysFavs='';
        for (let i = 1; i <= favoriteCitys.length; i++) {       
            listCitysFavs +=  `Ciudad Nro ${i} ${favoriteCitys[i-1]}\n`  ; 
        };
        return(listCitysFavs);
    };

    const loadDataStorage = (favoriteCitys, index) =>{
        listCitysFavs='';
        for (let i = 1; i <= favoriteCitys.length; i++) {       
            listCitysFavs += favoriteCitys[i-1];
            if(i == index){
                loadData(favoriteCitys[i-1]);
            }
        };
        
    
    };

    //Funcion para eliminar una ciudad de la lista de favoritos
    const deleteCityFavs = (favoriteCitys) => {
        let optionDelete = parseInt(prompt(`Ingrese el numero de ciudad a borrar de favoritos:\n${seeCitysFavs(favoriteCitys)}`));
        if(optionDelete > 0){
            favoriteCitys.splice(optionDelete-1,1);
            localStorage.setItem("favCitys", JSON.stringify(favoriteCitys));
            if(seeCitysFavs(favoriteCitys)==''){
                alert('No hay mas ciudades en favoritos');
            }
            else{
                alert('Se ha borrado con exito la ciudad elegida');
                alert(`Ciudades en favoritos restantes:\n${seeCitysFavs(favoriteCitys)}`);
            }
            
        }
        
    }

    //Funcion de busqueda de ciudad guardada en favoritos
    const searchCity = (inputCitysearch)=>{        
        let isInList = favoriteCitys.toString().toLowerCase().includes(inputCitysearch.toLowerCase());
        return isInList;
    }
    ////////////////////////////////
    //Bloque de operaciones
    let operaciones = '';
            
        while(operaciones != 5){

            operaciones = parseInt(prompt('Ingrese:\n1 para agregar ciudad a favorito\n2 para cargar una ciudad de favoritos\n3 para eliminar una ciudad de favoritos\n4 para buscar si existe ciudad guardada en favoritos\n5 Para salir'));
            //Operacion 1 agregado de ciudades a favoritos
            if(operaciones === 1){          
    
                
                do{
                    newFav = prompt('Ingrese ciudad a guardar en favoritos o "ESC" para finalizar');
                    addFavorites(newFav);                    
                }
                while(newFav != 'ESC');
            }
            //Operacion 2 para visualizar todas las ciudades en favoritos
            else if(operaciones === 2) {
                if( favoriteCitys == '' && favoriteCitysInMemory == ''){
                    alert('No hay ciudades en favoritos');
                    
                }
                else{
                    let loadCity = parseInt(prompt(`Elija la ciudad a cargar\n${seeCitysFavs(favoriteCitys, favoriteCitysInMemory)}`));
                    loadDataStorage(favoriteCitys, loadCity)
                }
                break;
                                            
                    
            }
            //Operacion 3 para eliminar ciudades de favoritos
            else if (operaciones === 3){
                if( favoriteCitys == ''){
                    alert('No hay ciudades en favoritos');
                }
                else{
                    deleteCityFavs(favoriteCitys);

                }
                
                
            }
            //Operacion 4 para la busqueda de una ciudad guardada en favoritos (busqueda dentro de un array)
            else if(operaciones === 4){
                let inputCitysearch = prompt('Ingrese el nombre de la ciudad a buscar');
                
                if (searchCity(inputCitysearch)){
                    alert(`La ciudad ${inputCitysearch} se encuentra agregada como favorita`);
                }
                else{
                    alert(`La ciudad ${inputCitysearch} NO se encuentra agregada como favorita`);
                }
            }
                
                

        }
            
        
    
    

} 
)














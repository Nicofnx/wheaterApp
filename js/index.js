const d = document;

async function loadData(chosenCity) {
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${chosenCity}&appid=332ea3116732c536f6f7f96e8a9e5cae&units=metric&lang=sp&cnt=5`)
    const data = await resp.json()
    console.log(data)

    const city = data.city.name
    $nameCity.innerHTML = city

    
    $today.innerHTML =principalCards({...formatData(data, 0), date: dateToday, moment: 'Hoy'})
    $tomorrow.innerHTML =principalCards({...formatData(data, 1), date: dateTomorrow, moment: 'Mañana'})

    
}

const formatData = (data, index) =>{
    const temp = data.list[index].main.temp.toFixed(1);
    const tempMax = data.list[index].main.temp_max.toFixed(1);
    const tempMin = data.list[index].main.temp_min.toFixed(1);
    const humedity = data.list[index].main.humidity;
    const description = capitalizarPrimeraLetra(data.list[index].weather[0].description);
    
    let iconImg = ``

    switch (data.list[index].weather[0].main) {
        case 'Thunderstorm':
            iconImg='./assets/logos/animated/thunder.svg'
            console.log('TORMENTA');
          break;
        case 'Drizzle':
            iconImg='./assets/logos/animated/rainy-2.svg'
            console.log('LLOVIZNA');
          break;
        case 'Rain':
            iconImg='./assets/logos/animated/rainy-7.svg'
            console.log('LLUVIA');
          break;
        case 'Snow':
            iconImg='./assets/logos/animated/snowy-6.svg'
            console.log('NIEVE');
          break;                        
        case 'Clear':
            iconImg='./assets/logos/animated/day.svg'
            console.log('LIMPIO');
          break;
        case 'Atmosphere':
            iconImg='./assets/logos/animated/weather.svg'
            console.log('ATMOSFERA');
            break;  
        case 'Clouds':
            iconImg='./assets/logos/animated/cloudy-day-1.svg'
            console.log('NUBES');
            break;  
        default:
            iconImg='./assets/logos/animated/cloudy-day-1.svg'
            console.log('por defecto');
      }
      return {temp,tempMax,tempMin,humedity,description,iconImg}
}

//Este es el pedido a la api a usar en el futuro


function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}






//Bloque de Fechas. Se utilizara para luego dar en cada card la fecha correspondiente al dia de "Hoy" y a los 5 dias posteriores
const monthNames = [
    "Enero", "Febrero", "marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

getLongMonthName = function(date) {
    return monthNames[date.getMonth()];
}

getShortMonthName = function(date) {
    return monthNames[date.getMonth()].substring(0, 3);
}


let date = new Date();


//Obtengo la fecha de hoy dia y es para la card HOY
let dateToday = `${date.getDate()} ${getShortMonthName(date)}`


const fechaDeManana = () => {
    let today = new Date();
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    let tomorrow = new Date(today.getTime() + DIA_EN_MILISEGUNDOS);
    return tomorrow;
};


//Obtengo la fecha de manana dia y es para la card MANANA
let dateTomorrow = `${fechaDeManana().getDate()} ${getShortMonthName(fechaDeManana())}`


//Simulo una respuesta de la api con datos de hoy y datos de manana
const toDay = [{
    city: 'Lujan',
    temp: 25,
    tempMax: 32,
    tempMin: 20,
    humedity: 60
},{
    city: 'Pueblo nuevo',
    temp: 27,
    tempMax: 30,
    tempMin: 21,
    humedity: 59
},{
    city: 'Rodriguez',
    temp: 24,
    tempMax: 29,
    tempMin: 15,
    humedity: 50
},{
    city: 'Capital federa',
    temp: 27,
    tempMax: 30,
    tempMin: 21,
    humedity: 57
},{
    city: 'Mar del plata',
    temp: 23,
    tempMax: 27,
    tempMin: 19,
    humedity: 78
},{
    city: 'La plata',
    temp: 34,
    tempMax: 36,
    tempMin: 27,
    humedity: 48
}];

const tomorrow = [{
    city: 'Lujan',
    temp: 27,
    tempMax: 34,
    tempMin: 22,
    humedity: 57
},{
    city: 'Pueblo nuevo',
    temp: 28,
    tempMax: 32,
    tempMin: 22,
    humedity: 65
},{
    city: 'Rodriguez',
    temp: 28,
    tempMax: 34,
    tempMin: 23,
    humedity: 55
},{
    city: 'Capital federal',
    temp: 29,
    tempMax: 32,
    tempMin: 24,
    humedity: 51
},{
    city: 'Mar del plata',
    temp: 25,
    tempMax: 29,
    tempMin: 21,
    humedity: 65
},{
    city: 'La plata',
    temp: 35,
    tempMax: 39,
    tempMin: 26,
    humedity: 52
}];

//Variables donde guardo los elementos HTML, los identifico con un $ para diferenciar de variables logicas
const $today = d.querySelector('#today')
const $tomorrow = d.querySelector('#tomorrow')
const $nameCity = d.querySelector('#namecity')
const $btnSearch = d.querySelector('#btnsearh')
const $btnFav = d.querySelector('#btnfav')
const $selectCity = d.querySelector('#selectcity')

//Plantilla de cards principales HOY y MANANA
const principalCards = ({temp, tempMax, tempMin, humedity, description,iconImg, date, moment}) =>{

    return plantilla = `
    <div class="bg-glass">
        <div class="card bg-transparent bg-glass border-white p-1" >
            <h2 class="text-center">${moment}</h2>
            <h5 class="text-center">${date}</h5>
            <div class="img-temp d-flex justify-content-center align-items-center">
                <img src="${iconImg}" class=" img-clima" alt="logo del pronostico del dia">
                <div>
                    <h2 id="temptoday" class="m-2">${temp} °C</h2>
                </div>
            </div>                
            <div class="card-body">
                <h5 class="card-title fs-5 text-center">${description}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent border-white text-center">Temp max: <span class="fw-bold">${tempMax} °C</span></li>
                <li class="list-group-item bg-transparent border-white text-center">Temp min: <span class="fw-bold">${tempMin} °C</span></li>
                <li class="list-group-item bg-transparent border-white text-center">Humedad: <span class="fw-bold">${humedity} %</span></li>
            </ul>                
        </div>
    </div>
`

}
//Con este map creo las opciones del select en base a la cantidad de ciudades que tengo en el objeto
toDay.map((el)=>{
    const $option = d.createElement('option')
    $option.setAttribute('value', el.city)
    $option.textContent = el.city
    $option.classList.add('optionCity')
    $selectCity.appendChild($option)
})

//Creo una escucha sobre el boton de busqueda para tomar el valor del option elegido
 $btnSearch.addEventListener('click',(e)=>{
    e.preventDefault()

    let chosenCity = $selectCity.value
    console.log(chosenCity)
    loadData(chosenCity)
    
    
    
    

    //Llamada a la funcion de la iteracion, donde por parametro le paso el objeto a iterar y la ciudad seleccionada en el select.
    //dataClimaToday(toDay, tomorrow,chosenCity);
    
})

//Itero los objetos para obtener los datos que necesito de la resp de la api.

const dataClimaToday = (toDay, tomorrow, chosenCity) => {
        
            for (let index = 0; index < toDay.length; index++){
                const {city} = toDay[index];
       
        
                if( chosenCity == city){       
                    const {city, temp, tempMax, tempMin, humedity} = toDay[index];
                    $nameCity.innerHTML = city
                    $today.innerHTML =principalCards(temp,tempMax,tempMin,humedity, dateToday,'Hoy')
                    
                    };
                
                
            };
            for (let index = 0; index < tomorrow.length; index++) {
                const {city} = toDay[index];
                    
                if( chosenCity == city){                   
                    const {temp, tempMax, tempMin, humedity} = tomorrow[index];                
                    $tomorrow.innerHTML = principalCards(temp,tempMax,tempMin,humedity,'Cielo claro', dateTomorrow, `Mañana`)
                }
                
            }

            
    
}


//Agrego boton para ejecutar el menu para agregar ciudades como favoritas
$btnFav.addEventListener('click',(e)=>{
    e.preventDefault()    

    const favoriteCitys = [];

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
    //Funcion para eliminar una ciudad de la lista de favoritos
    const deleteCityFavs = (favoriteCitys) => {
        let optionDelete = parseInt(prompt(`Ingrese el numero de ciudad a borrar de favoritos:\n${seeCitysFavs(favoriteCitys)}`));
        if(optionDelete > 0){
            favoriteCitys.splice(optionDelete-1,1);
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

            operaciones = parseInt(prompt('Ingrese:\n1 para agregar ciudad a favorito\n2 para ver todas las ciudades de favoritos\n3 para eliminar una ciudad de favoritos\n4 para buscar si existe ciudad guardada en favoritos\n5 Para salir'));
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
                if( favoriteCitys == ''){
                    alert('No hay ciudades en favoritos');
                    
                }
                else{
                    alert(seeCitysFavs(favoriteCitys));
                    
                }
                                            
                    
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

loadData('Lujan')












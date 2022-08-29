

//Este es el pedido a la api a usar en el futuro
/* async function loadData() {
    const resp = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=-34.5670936&lon=-59.1515603&appid=332ea3116732c536f6f7f96e8a9e5cae')
    const data = await resp.json()
    console.log(data)
}
loadData() */


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


let menu = parseInt(prompt('Ingrese 1 para saber el tiempo\nIngrese 2 para anadir ciudades a favoritos'));

if(menu == 1){
    //Se realizara la busqueda desde el serch la cuidad que desea buscar. Cuando veamos storage se almacenaran las favoritas y cuando veamos geolocalizacion se realizara una busqueda por defecto en la ubicacion del usuario.
    
    const listcitys = () => {
        let listcitys=[];
        let count=0;
        toDay.forEach((el)=>{
            count++;
            listcitys += [`Ciudad Nro ${count}: ${el.city}\n`]    ;    
        })
        return listcitys;
    };
    
    let choseCity = prompt(`Ingresa ciudad de la lista\n${listcitys(toDay)}`);
    
    //Itero los objetos para obtener los datos que necesito de la resp de la api.
    const dataClimaToday = (toDay, tomorrow) => {
        
    
        for (let index = 0; index < toDay.length; index++){
            
           
            
            if( choseCity == (index+1)){       
                const {city, temp, tempMax, tempMin, humedity} = toDay[index];
                //A futuro en vez de un 'alert' se actualizara la card correspondiente al dia.                              
                alert(`La temperatura de hoy en ${city} es de ${temp}°C con una humedad del ${humedity}% \nLa temperatura minima es de ${tempMin}°C y la temperatura maxima es de ${tempMax}°C`);
                };
            
            
        };
        for (let index = 0; index < tomorrow.length; index++) {
    
                
            if( choseCity == (index+1)){                   
                const {temp, tempMax, tempMin, humedity} = tomorrow[index];                
                alert(`La temperatura de manana sera de ${temp}°C con una humedad del ${humedity}% \nCon una temperatura minima de ${tempMin}°C y temperatura maxima es de ${tempMax}°C`);
                
            }
            
        }
    }
    //Llamada a la funcion de la iteracion, donde por parametro le paso el objeto a iterar.
    dataClimaToday(toDay, tomorrow);
}

//Segunda opcion del menu para el agregado de ciudades a favoritos
else if (menu == 2) {

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
            
        
    
    

} else {
    alert('Programa finalizado');
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
console.log(date);

let day = date.getDate();
let month = getShortMonthName(date);

console.log(day);
console.log(month);






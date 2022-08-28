
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
},];

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
},];

let menu = parseInt(prompt('Ingrese 1 para saber el tiempo\nIngrese 2 para anadir ciudades a favoritos'))

if(menu == 1){
    //Se realizara la busqueda desde el serch la cuidad que desea buscar. Cuando veamos storage se almacenaran las favoritas y cuando veamos geolocalizacion se realizara una busqueda por defecto en la ubicacion del usuario.
    let choseCity = prompt('Ingresa ciudad ("Lujan", "Pueblo nuevo" o "Rodriguez")');
    
    //Itero los objetos para obtener los datos que necesito de la resp de la api.
    const dataClimaToday = (dataDay, tomorrow) => {
        
    
        for (let index = 0; index < toDay.length; index++){
            
            const {city} = toDay[index];
            
            if( choseCity == city){       
                const {city, temp, tempMax, tempMin, humedity} = toDay[index];
                //A futuro en vez de un 'alert' se actualizara la card correspondiente al dia.                              
                alert(`La temperatura de hoy en ${city} es de ${temp}°C con una humedad del ${humedity}% \nLa temperatura minima es de ${tempMin}°C y la temperatura maxima es de ${tempMax}°C`);
                }
            
            
        }
        for (let index = 0; index < tomorrow.length; index++) {
    
            const {city} = tomorrow[index];
    
            if( choseCity == city){                   
                const {temp, tempMax, tempMin, humedity} = tomorrow[index];                
                alert(`La temperatura de manana sera de ${temp}°C con una humedad del ${humedity}% \nCon una temperatura minima de ${tempMin}°C y temperatura maxima es de ${tempMax}°C`);
                
            }
            
        }
    }
    //Llamada a la funcion de la iteracion, donde por parametro le paso el objeto a iterar.
    dataClimaToday(toDay, tomorrow)
}

//Segunda opcion del menu para el agregado de ciudades a favoritos
else if (menu == 2) {

    const favoriteCitys = [];

    let newFav=''
   
    let listCitysFavs = ''
    
    //Bloque de funciones

    //Fuencion para agregar a favoritos
    const addFavorites= (favoriteCitys) => {
        newFav = prompt('Ingrese ciudad a guardar en favoritos o "ESC" para finalizar')
        if(newFav != 'ESC'){
            favoriteCitys.push(newFav)
            alert (`Ciudad ${newFav} agregada`)
        }
        
    }
    //Funciona para ver lista de favoritos
    const seeCitysFavs = (favoriteCitys) =>{
        listCitysFavs='';
        for (let i = 1; i <= favoriteCitys.length; i++) {       
            listCitysFavs +=  `Ciudad Nro ${i} ${favoriteCitys[i-1]}\n`   
        }
        return(listCitysFavs)
    }
    //Fuencion para eliminar una ciudad de la lista de favoritos
    const deleteCityFavs = (favoriteCitys) => {
        let optionDelete = parseInt(prompt(`Ingrese el numero de ciudad a borrar de favoritos:\n${seeCitysFavs(favoriteCitys)}`))
        if(optionDelete > 0){
            favoriteCitys.splice(optionDelete-1,1)
            if(seeCitysFavs(favoriteCitys)==''){
                alert('No hay mas ciudades en favoritos')
            }
            else{
                alert(seeCitysFavs(favoriteCitys))
            }
            
        }
        
    }
    ////////////////////////////////
    //Bloque de operaciones
    let operaciones = ''
            
        while(operaciones != 4){

            operaciones = parseInt(prompt('Ingrese:\n1 para agregar ciudad a favorito\n2 para ver todas las ciudades de favoritos\n3 para eliminar una ciudad de favoritos\n4 Para salir'))
            //Operacion 1 agregado de ciudades a favoritos
            if(operaciones == 1){          
    
                
                do{
                    addFavorites(favoriteCitys)
                    
                }
                while(newFav != 'ESC')
            }
            //Operacion 2 para visualizar todas las ciudades en favoritos
            else if(operaciones == 2) {
                if( favoriteCitys == ''){
                    alert('No hay ciudades en favoritos')
                    
                }
                else{
                    alert(seeCitysFavs(favoriteCitys))
                    
                }
                                            
                    
            }
            //Operacion 3 para eliminar ciudades de favoritos
            else if (operaciones == 3){
                if( favoriteCitys == ''){
                    alert('No hay ciudades en favoritos')
                }
                else{
                    deleteCityFavs(favoriteCitys)

                }
                
                
            }
                
                

        }
            
        
    
    

} else {
    alert('Programa finalizado')
}


//Bloque de Fechas. Se utilizara para luego dar en cada card la fecha correspondiente al dia de "Hoy" y a los 5 dias posteriores
const monthNames = ["Enero", "Febrero", "marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

getLongMonthName = function(date) {
    return monthNames[date.getMonth()];
}

getShortMonthName = function(date) {
    return monthNames[date.getMonth()].substring(0, 3);
}


let date = new Date()
console.log(date)

let day = date.getDate()
let month = getShortMonthName(date)

console.log(day)
console.log(month)






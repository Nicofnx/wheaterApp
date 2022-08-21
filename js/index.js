
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
    temp: 270,
    tempMax: 310,
    tempMin: 210,
    humedity: 59
},{
    city: 'Rodriguez',
    temp: 24000,
    tempMax: 29000,
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
    tempMin: 23000,
    humedity: 55
},];

//Se realizara la busqueda desde el serch la cuidad que desea buscar. Cuando veamos storage se almacenaran las favoritas y cuando veamos geolocalizacion se realizara una busqueda por defecto en la ubicacion del usuario.
let choseCity = prompt('Ingresa ciudad ("Lujan", "Pueblo nuevo" o "Rodriguez")');

//Itero los objetos para obtener los datos que necesito de la resp de la api.
const dataClimaToday = (dataDay, tomorrow) => {
    

    for (let index = 0; index < dataDay.length; index++){
        
        const {city} = dataDay[index];
        
        if( choseCity == city){       
            const {city, temp, tempMax, tempMin, humedity} = dataDay[index];
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


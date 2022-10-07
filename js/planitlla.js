//Plantilla de cards principales HOY y MANANA
let plantilla =''

const principalCards = ({temp='--', feelTemp='--', tempMax='--', tempMin='--', humedity='--', description='Sin descripcion',iconImg=`./assets/logos/clima-logo.png`, date='--', sunrise='--', sunset, wind='--', speedWind='--'}) =>{

    return plantilla = `
    <div class="justify-content-center">
            <div class="box-newcard">
                <div class="box-data">
                    <div class="data">
                        <div class="box-date">                            
                            <span id="date">Hoy ${date}</span>
                        </div>
                        <div id="temp">${temp}°C</div>
                        <div id="feelsTemp">Sensacion termica: ${feelTemp}°C</div>
                    </div>
                </div>
                <div class="box-data">
                    <div class="float-card">
                        <h2 class="text-capitalize">${description}</h2>
                        <div class="box-img-card d-flex justify-content-center align-items-center h-100">
                            <img src="${iconImg}" alt="Logo que representa el clima(nublado, soleado, tormenta, etc)">
                        </div>                        
                        <div class="box_sunrise_set">
                            <div class="sunriseset"><img class="logosol" src="./assets/logos/sunrise.svg" alt="salida del sol"> ${sunrise}</div>
                            <div class="sunriseset"><img class="logosol" src="./assets/logos/sunset.svg" alt="puesta del sol"> ${sunset}</div>
                        </div>
                    </div>
                </div>
                <div class="box-data">
                    <div class="data">
                        <div id="tempMax"><i class="fa-solid fa-temperature-arrow-up"></i> Max: ${tempMax}°C</div>
                        <div id="tempMin"><i class="fa-solid fa-temperature-arrow-down"></i> Min: ${tempMin}°C</div>
                        <div id="humedity"><i class="fa-solid fa-droplet"></i><i class="fa-solid fa-percent"></i>: ${humedity}%</div>
                        <div id="wind"><i class="fa-solid fa-wind"></i> ${wind} a ${speedWind} km/h</div>
                    </div>
                </div>
            </div>
            
`
};

export {principalCards}
//Plantilla de cards principales HOY y MANANA
let plantilla =''

const principalCards = ({temp, tempMax, tempMin, humedity, description,iconImg, date, moment}) =>{

    return plantilla = `
    <div class="bg-glass">
        <div class="card bg-transparent bg-glass border-white p-1" >
            <h2 class="text-center">${moment}</h2>
            <h5 class="text-center">${date}</h5>
            <div class="img-temp d-flex justify-content-center align-items-center">
                <img src="${iconImg}" class=" img-clima" alt="logo del pronostico del dia">
                <div class="text-temp">
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
};

export {principalCards}

let plantillaSecundaria=''
const secundaryCards = ({temp, description, iconImg, date}) => {
    
    return plantillaSecundaria = `
                        <div class="bg-glass">
                            <div class="card bg-transparent border-white p-1" >                        
                                <h5 class="text-center">${date}</h5>
                                <div class="img-temp d-flex flex-column justify-content-center align-items-center">
                                    <img src="${iconImg}" class=" img-clima" alt="logo del pronostico del dia">
                                    <div>
                                        <h2 id="temp" class="m-2 text-center fs-1">${temp} °C</h2>
                                    </div>
                                </div>                                
                                <div class="card-body p-0">
                                    <p class="card-title text-center ">${description}</p>
                                </div>
                            </div>
                        </div>
    `
}

export {secundaryCards}

let plantillaSecundaria=''
const secundaryCards = ({temp, description, iconImg, date}) => {
    
    return plantillaSecundaria = `
                        <div class="bg-glass">
                            <div class="card bg-transparent border-white p-1" >                        
                                <h3 class="text-center">${date}</h3>
                                <div class="img-temp d-flex flex-column justify-content-center align-items-center">
                                    <img src="${iconImg}" class=" img-clima" alt="logo del pronostico del dia">
                                    <div>
                                        <p id="temp" class="m-2 text-center">${temp} °C</p>
                                    </div>
                                </div>                                
                                <div class="card-body p-0">
                                    <h4 class="card-title text-center ">${description}</h4>
                                </div>
                            </div>
                        </div>
    `
}

export {secundaryCards}
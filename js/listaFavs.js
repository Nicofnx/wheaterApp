
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
    `;
    return cityfav;
} 

export {listCitys}
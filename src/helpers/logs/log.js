import * as fs from 'fs'

import { fechaCorta, fechaLarga } from '../fechas/formateador.js'

const fecha = fechaCorta(new Date());

const ruta = `./src/logs/log${ fecha }.log`; 

export const Bitacora = (endpoint, mensaje)=>{
    try{
        const fechayhora = fechaLarga(new Date());
        const data = `${fechayhora} ${endpoint} ${mensaje} \n`;
        if(!fs.existsSync(ruta)){
            fs.writeFileSync(ruta,data);
        }else{
            fs.appendFileSync(ruta,data)
        }
    }catch(error){
        console.log(error)
    }
}
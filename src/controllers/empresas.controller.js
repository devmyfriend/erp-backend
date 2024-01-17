import { ListadoEmpresas } from "../models/empresas.model.js";
import { Connection } from "../database/mariadb.database.js";
import { Op, json } from "sequelize";

const obtenerEmpresas = async (req, res) => {
    try{
        var empresas;
        const data = req.body;

        if(req.body.esPropietaria){
            empresas = await Connection.query('CALL ListadoEmpresas(:Saltos, :Limite, :Opc)', {
                replacements: { Saltos: data.Saltos, Limite: data.Limite, Opc: data.Opc },
                where: {
                    esPropietaria: 1
                },
            });
            console.log("Es propietaria Obtener empresas")
        }else{
            empresas = await Connection.query('CALL ListadoEmpresas(:Saltos, :Limite, :Opc)', {
                replacements: { Saltos: data.Saltos, Limite: data.Limite, Opc: data.Opc },
            });
            console.log("NO propietaria Obtener empresas")
        }
        
        const respuesta = {
            respuesta: empresas
        }
        
        res.json(respuesta);
    }catch(error){
        console.error('Error al obtener empresas:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const busquedaEmpresas = async (req, res) => {
    try{
        var empresas;
        const data = req.body;

        if(req.body.esPropietaria){
            empresas = await Connection.query('CALL BuscadorEmpresas(:Saltos, :Limite, :Opc, :Busqueda)', {
                replacements: { Saltos: data.Saltos, Limite: data.Limite, Opc: data.Opc, Busqueda: data.Busqueda },
                where: {
                    esPropietaria: 1
                },
            });
            console.log("Es propietaria Busqueda: " + data.Busqueda )
        }else{
            empresas = await Connection.query('CALL BuscadorEmpresas(:Saltos, :Limite, :Opc, :Busqueda)', {
                replacements: { Saltos: data.Saltos, Limite: data.Limite, Opc: data.Opc, Busqueda: data.Busqueda },
            });
            console.log("NO propietaria Busqueda: " + data.Busqueda)
        }

        const respuesta = {
            respuesta: empresas
        }
        res.json(respuesta);
    }catch(error){
        console.error('Error al obtener empresas:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const methods = {
    obtenerEmpresas,
    busquedaEmpresas,
};
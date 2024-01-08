import { Colonia } from "../models/colonias.model.js";
import { Op } from "sequelize";

const crearColonia = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
        }
        const result = await Colonia.create(data);
        res.status(201).json({ success: true, data: result });
    }catch(error){
        console.error('Error al crear colonia:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const methods = {
    crearColonia,
}
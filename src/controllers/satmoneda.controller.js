import { SatMonedaModel } from "../models/satmoneda.model.js";
import { buscarMonedaSatPorClave, buscarMonedaSatPorClaveActivo } from "../middlewares/finders/index.js"; 

const CrearSatMoneda = async(req, res)=>{
    try{
        const data = req.body;
        const Existe = await buscarMonedaSatPorClave(data.ClaveMoneda)

        if (Existe.existe === true){
            return res.status(404).send({
                status: 'Error',
                message: 'La clave de moneda SAT ya está en uso'
            });
        }

        const Crear = await SatMonedaModel.create({
            ClaveMoneda: data.ClaveMoneda,
            Descripcion: data.Descripcion,
            Activo: true
        });
        
        return res.status(200).send({
            status: 'Ok',
            message: 'Se creo moneda SAT', 
            data: Crear
        })

    }
    catch(error){
        return res.status(500).send({
            errors: 'Error al obtener los datos'
        });
    }

}

const EditarSatMoneda = async (req, res) => {
    try{
        const data = req.body;
        const Existe = await buscarMonedaSatPorClave(data.ClaveMoneda);
        // console.log(`valor de existe ${ Existe.existe}`)
        if (Existe.existe === false){
            return res.status(404).send({
                status: 'Error',
                message: 'La clave de moneda SAT no existe'
            });
        }

        const Editar = await SatMonedaModel.update({
            Descripcion: data.Descripcion,
            Activo:  data.Activo,
        },
        {where: {ClaveMoneda: data.ClaveMoneda}}
        );
        
        return res.status(200).send({
            status: 'OK',
            Message: 'Se actualizó moneda SAT correctamente'
        })
    }
    catch(error){
		console.log(error)
        return res.status(500).send({
            errors: 'Error al obtener los datos'
        });
    }
}

const EliminarSatMoneda = async (req, res) => {
	try {

        const { ClaveMoneda, Activo } = req.body;
        const Existe = await buscarMonedaSatPorClave(ClaveMoneda);

        if (Existe.existe === false){
            return res.status(404).send({
                status: 'Error',
                message: 'La clave moneda SAT no existe'
            });
        }

		await SatMonedaModel.destroy({
            where: {ClaveMoneda: ClaveMoneda}
        });

        return res.status(200).send({
            status: 'OK',
            Message: 'Moneda SAT borrado'
        })

	} catch (error) {
        return res.status(500).send({
            errors: 'Error al obtener los datos'
        });
	}
};

const HabilitarSatMoneda = async (req, res) => {
    try{
        const { ClaveMoneda } = req.body;
        const Existe = await buscarMonedaSatPorClave(ClaveMoneda);
        // console.log(`valor de existe ${ Existe.existe}`)
        if (Existe.existe === false){
            return res.status(404).send({
                status: 'Error',
                message: 'La clave moneda SAT no existe'
            });
        }

        const Editar = await SatMonedaModel.update(
            {
                Activo: true,
            },
            {
                where: {ClaveMoneda: ClaveMoneda}
            }
        );
        
        return res.status(200).send({
            status: 'OK',
            Message: 'Moneda SAT habilitado correctamente'
        })
    }
    catch(error){
		console.log(error)
        return res.status(500).send({
            errors: 'Error al obtener los datos'
        });
    }
}

const DesHabilitarSatMoneda = async (req, res) => {
    try{
        const { ClaveMoneda } = req.body;
        const Existe = await buscarMonedaSatPorClave(ClaveMoneda);
        // console.log(`valor de existe ${ Existe.existe}`)
        if (Existe.existe === false){
            return res.status(404).send({
                status: 'Error',
                message: 'La clave moneda SAT no existe'
            });
        }

        const Editar = await SatMonedaModel.update(
            {
                Activo: false,
            },
            {
                where: {ClaveMoneda: ClaveMoneda}
            }
        );
        
        return res.status(200).send({
            status: 'OK',
            Message: 'Moneda SAT deshabilitado correctamente'
        })
    }
    catch(error){
		console.log(error)
        return res.status(500).send({
            errors: 'Error al obtener los datos'
        });
    }
}

export const methods = {
    CrearSatMoneda,
    EditarSatMoneda,
    EliminarSatMoneda,
    HabilitarSatMoneda,
    DesHabilitarSatMoneda
};
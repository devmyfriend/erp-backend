import { Familia } from '../models/index.js';
import { buscadorFamiliasPorNombre } from '../helpers/buscadores.js';
import { validaFamiliaPorId, validaFamiliaPorNombre } from '../middlewares/finders/index.js';
import { Bitacora } from '../helpers/logs/log.js';

const obtenerFamilias = async (req, res) => {
    try {
        const datos = await Familia.findAll();

        if (datos.length < 1) {
            return res.status(404).send({
                status: "Error",
                message: 'No se encontraron familias',
            });
        }

        res.status(200).send({
            status: "OK",
            message: "Familias encontradas",
            familias: datos
        });
    } catch (error) {
        console.error(error);
        Bitacora('obtenerFamilias', error);
        res.status(500).send({
            status: "Error",
            message: "Error al obtener las familias",
        });
    }
};

const buscarFamiliasPorNombre = async (req, res) => {
    try {
        const { NombreFamilia } = req.params;

        const resultado = await buscadorFamiliasPorNombre(NombreFamilia);

        if (!resultado.existe) {
            return res.status(404).send({
                status: "Error",
                message: "No se encontraron familias",
            })
        }

        res.status(200).send({
            status: "OK",
            message: `Familias encontradas con el nombre ${NombreFamilia}`,
            familias: resultado.data,
        });

    } catch (error) {
        Bitacora('buscarFamiliasPorNombre', error);
        res.status(500).send({
            status: "Error",
            message: "Error al buscar las familias",
        });
    }
};

const crearFamilia = async (req, res) => {
    try{
        const familiaBody = req.body;
        familiaBody.CreadoEn = new Date();
        const nombreExistente = await validaFamiliaPorNombre(familiaBody.NombreFamilia);
    
        if (nombreExistente.existe) {
            return res.status(409).json({
                status: 409,
                error: 'El nombre de la familia ya existe',
            });
        }
    
        return res
            .status(200)
            .send({ 
                status: "OK",
                message: "Familia creada correctamente",
                familia: await Familia.create(familiaBody),
            });
    }catch(error){
        Bitacora('crearFamilia', error);
        res.status(500).send({
            status: "Error",
            message: "Error al crear la familia",
        });
    }
}

const actualizarFamilia = async (req, res) => {
    try {
        const familiaBody = req.body;
        familiaBody.ActualizadoEn = new Date();
        const idExistente = await validaFamiliaPorId(familiaBody.FamiliaId);
        const nombreExistente = await validaFamiliaPorNombre(familiaBody.NombreFamilia);

        if (!idExistente.existe) {
            return res.status(404).json({
                status: 404,
                error: 'La familia no existe',
            });
        }
        if (nombreExistente.existe && nombreExistente.data.FamiliaId !== familiaBody.FamiliaId) {
            return res.status(409).json({
                status: 409,
                error: 'El nombre de la familia ya existe',
            });
        }

        return res.status(200).send({
            status: "OK",
            message: "Familia actualizada correctamente",
            familia: await Familia.update(familiaBody, { where: { FamiliaId: familiaBody.FamiliaId } }),
        });
    } catch (error) {
        Bitacora('actualizarFamilia', error);
        res.status(500).send({
            status: "Error",
            message: "Error al actualizar la familia",
        });
    }
}

const borrarFamilia = async (req, res) => {
    try {
        const familiaBody = req.body;
        familiaBody.BorradoEn = new Date();
        const idExistente = await validaFamiliaPorId(familiaBody.FamiliaId);

        if (!idExistente.existe) {
            return res.status(404).json({
                status: 404,
                error: 'La familia no existe',
            });
        }

        if (idExistente.data.Activo === false) {
            return res.status(409).json({
                status: 409,
                error: 'La familia ya ha sido eliminada',
            });
        }

        return res.status(200).send({
            status: "OK",
            message: "Familia eliminada correctamente",
            familia: await Familia.update({ Activo: false }, { where: { FamiliaId: familiaBody.FamiliaId } }),
        });
    } catch (error) {
        Bitacora('borrarFamilia', error);
        res.status(500).send({
            status: "Error",
            message: "Error al eliminar la familia",
        });
    }
}

export const methods = {
    obtenerFamilias,
    buscarFamiliasPorNombre,
    crearFamilia,
    actualizarFamilia,
    borrarFamilia
};
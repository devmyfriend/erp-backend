import { Subfamilia } from '../models/index.js';
import { buscadorSubfamiliasPorNombre, buscadorSubfamiliasPorFamiliaId } from '../helpers/buscadores.js';
import { validaFamiliaPorId ,validaSubfamiliaPorId, validaSubfamiliaPorNombre } from '../middlewares/finders/index.js';
import { Bitacora } from '../helpers/logs/log.js';

const obtenerSubfamilias = async (req, res) => {
    try {
        const datos = await Subfamilia.findAll();

        if (datos.length < 1) {
            return res.status(404).send({
                status: "Error",
                message: 'No se encontraron subfamilias',
            });
        }

        res.status(200).send({
            status: "OK",
            message: "Subfamilias encontradas",
            subfamilias: datos
        });
    } catch (error) {
        console.error(error);
        Bitacora('obtenerSubfamilias', error);
        res.status(500).send({
            status: "Error",
            message: "Error al obtener las subfamilias",
        });
    }
};

const buscarSubfamiliasPorNombre = async (req, res) => {
    try {
        const { NombreSubFamilia } = req.params;
        const resultado = await buscadorSubfamiliasPorNombre(NombreSubFamilia);

        if (!resultado.existe) {
            return res.status(404).send({
                status: "Error",
                message: "No se encontraron subfamilias",
            })
        }

        res.status(200).send({
            status: "OK",
            message: `Subfamilias encontradas con el nombre ${NombreSubFamilia}`,
            subfamilias: resultado.data,
        });

    } catch (error) {
        Bitacora('buscarSubfamiliasPorNombre', error);
        res.status(500).send({
            status: "Error",
            message: "Error al buscar las subfamilias",
        });
    }
};

const buscarSubfamiliasPorFamiliaId = async (req, res) => {
    try {
        const { FamiliaId } = req.params;
        const resultado = await buscadorSubfamiliasPorFamiliaId(FamiliaId);

        if (!resultado.existe) {
            return res.status(404).send({
                status: "Error",
                message: "No se encontraron subfamilias",
            })
        }

        res.status(200).send({
            status: "OK",
            message: `Subfamilias encontradas con la familiaId ${FamiliaId}`,
            subfamilias: resultado.data,
        });
    } catch (error) {
        Bitacora('buscarSubfamiliasPorFamiliaId', error);
        res.status(500).send({
            status: "Error",
            message: "Error al buscar las subfamilias",
        });
    }
};

const crearSubfamilia = async (req, res) => {
    try{
        const subfamiliaBody = req.body;
        subfamiliaBody.CreadoEn = new Date();
        const familiaExistente = await validaFamiliaPorId(subfamiliaBody.FamiliaId);    
        if (!familiaExistente.existe) {
            return res.status(404).json({
                status: 404,
                error: 'La familia no existe',
            });
        }
        const nombreExistente = await validaSubfamiliaPorNombre(subfamiliaBody.NombreSubFamilia);
        if (nombreExistente.existe) {
            return res.status(409).json({
                status: 409,
                error: 'El nombre de la subfamilia ya existe',
            });
        }
        return res
            .status(200)
            .send({ 
                status: "OK",
                message: "Subfamilia creada correctamente",
                subfamilia: await Subfamilia.create(subfamiliaBody),
            });
    }catch(error){
        Bitacora('crearSubfamilia', error);
        res.status(500).send({
            status: "Error",
            message: "Error al crear la subfamilia",
        });
    }
}

const actualizarSubfamilia = async (req, res) => {
    try {
        const subfamiliaBody = req.body;
        subfamiliaBody.ActualizadoEn = new Date();
        const idExistente = await validaSubfamiliaPorId(subfamiliaBody.SubFamiliaId);
        if (!idExistente.existe) {
            return res.status(404).json({
                status: 404,
                error: 'La subfamilia no existe',
            });
        }
        const familiaExistente = await validaFamiliaPorId(subfamiliaBody.FamiliaId);
        if (!familiaExistente.existe) {
            return res.status(404).json({
                status: 404,
                error: 'La familia no existe',
            });
        }
        const nombreExistente = await validaSubfamiliaPorNombre(subfamiliaBody.NombreSubFamilia);
        if (nombreExistente.existe && nombreExistente.data.SubFamiliaId !== subfamiliaBody.SubFamiliaId) {
            return res.status(409).json({
                status: 409,
                error: 'El nombre de la subfamilia ya existe',
            });
        }

        return res.status(200).send({
            status: "OK",
            message: "Subfamilia actualizada correctamente",
            subfamilia: await Subfamilia.update(subfamiliaBody, { where: { SubFamiliaId: subfamiliaBody.SubFamiliaId } }),
        });
    } catch (error) {
        Bitacora('actualizarSubfamilia', error);
        res.status(500).send({
            status: "Error",
            message: "Error al actualizar la subfamilia",
        });
    }
}

const borrarSubfamilia = async (req, res) => {
    try {
        const subfamiliaBody = req.body;
        subfamiliaBody.BorradoEn = new Date();
        const idExistente = await validaSubfamiliaPorId(subfamiliaBody.SubFamiliaId);

        if (!idExistente.existe) {
            return res.status(404).json({
                status: 404,
                error: 'La subfamilia no existe',
            });
        }
        if (idExistente.data.Activo === false) {
            return res.status(409).json({
                status: 409,
                error: 'La subfamilia ya ha sido eliminada',
            });
        }

        return res.status(200).send({
            status: "OK",
            message: "Subfamilia eliminada correctamente",
            subfamilia: await Subfamilia.update({ Activo: false }, { where: { SubFamiliaId: subfamiliaBody.SubFamiliaId } }),
        });
    } catch (error) {
        Bitacora('borrarSubfamilia', error);
        res.status(500).send({
            status: "Error",
            message: "Error al eliminar la subfamilia",
        });
    }
}

export const methods = {
    obtenerSubfamilias,
    buscarSubfamiliasPorNombre,
    buscarSubfamiliasPorFamiliaId,
    crearSubfamilia,
    actualizarSubfamilia,
    borrarSubfamilia
};
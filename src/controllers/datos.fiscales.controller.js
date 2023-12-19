import { EntidadNegocio } from "../models/orgEntidadesnegocio.model.js";
import { regimenFiscal } from "../models/sat.regimen.fiscal.model.js";
import { Pais } from "../models/sat.pais.model.js";

 const obtenerIdEmpresa = async ( req, res) =>{
        try{ 

            const idEmpresa = await EntidadNegocio.findAll({
                attributes: ['EntidadNegocioId','EsPropietaria','RFC', 'NombreComercial', 'ClavePais', 'TaxId', 'ClaveRegimenFisca', 'PersonaFisica', 'PersonalMoral', 'NombreOficial', 'Estatus']
            });
                res.json(idEmpresa);
        }catch (error) { 
            console.log('Error al obtener el id de la empresa', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const buscarIdEmpresa = async ( req, res) =>{
        console.log('hola 123');
        try{
           const data = req.body;
           if(!data) {
            return res.status(400).json({error: 'Cuerpo de la peticion invalida'});
           }
           const result = await EntidadNegocio.findAll({
            attributes: ['EntidadNegocioId', 'EsPropietario', 'RFC', 'NombreComercial', 'ClavePais', 'TaxId', 'ClaveRegimenFisca', 'PersonaFisica', 'PersonaMoral', 'NombreOficial', 'Estatus'],
            where: {
                EntidadNegocioId: data.EntidadNegocioId
            },
        });
        res.status(201).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar el id de la empresa', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const crearIdEmpresa = async (req, res) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la peticion invalida' });
            }
            const result = await EntidadNegocio.create({
                EntidadNegocioId: data.EntidadNegocioId,
                EsPropietario: data.EsPropietario,
                RFC: data.RFC,
                NombreComercial: data.NombreComercial,
                ClavePais: data.ClavePais,
                TaxId: data.TaxId,
                ClaveRegimenFiscal: data.ClaveRegimenFiscal,
                PersonaFisica: data.PersonaFisica,
                PersonaMoral: data.PersonaMoral,
                NombreOficial: data.NombreOficial,
                Estatus: data.Estatus
            });
            res.status(201).json({ success: true, data: result.toJSON() });
        } catch (error) {
            console.log('Error al crear el id de la empresa', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    const editarIdEmpresa = async (req, res) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
            }
    
            const { EntidadNegocioId, ...actualizacion } = data;
    
            const entidadNegocio = await EntidadNegocio.findByPk(EntidadNegocioId);
    
            if (!entidadNegocio) {
                return res.status(404).json({ error: 'Entidad de negocio no encontrada' });
            }
    
            await entidadNegocio.update(actualizacion);
    
            console.log('Entidad de negocio editada con éxito');
            return res.json({ success: true, data: entidadNegocio.toJSON() });
        } catch (error) {
            console.error('Error al editar entidad de negocio:', error.message);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };

    const desactivarIdEmpresa = async (req, res) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
            }
            const entidadNegocio = await EntidadNegocio.findByPk(data.EntidadNegocioId);

            if (!entidadNegocio) {
                return res.status(404).json({ error: 'Entidad de negocio no encontrada' });
            }

            entidadNegocio.Borrrado = true;
            entidadNegocio.BorradoPor = data.BorradoPor;

            await entidadNegocio.save();

            console.log('Entidad de negocio desactivada con éxito');

            return res.status(200).json({ message: 'Entidad de negocio desactivada: ' + data.EntidadNegocioId });
        } catch (error) {
            console.error('Error al desactivar entidad de negocio:', error.message);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };
    

    const obtenerRFC = async (req, res) => {
        try {
            const rfc = await EntidadNegocio.findAll({
                attributes: ['EntidadNegocioID','RFC'],
            });
            res.json(rfc);
        } catch (error) {
            console.log('Error al obtener el RFC de la empresa', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const crearRFC = async (req, res) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la peticion invalida' });
            }
            const result = await EntidadNegocio.create({
                EntidadNegocioId: data.EntidadNegocioId,
                RFC: data.RFC
            });
            res.status(201).json({ success: true, data: result.toJSON() });
        } catch (error) {
            console.log('Error al crear el RFC de la empresa', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    const editarRFC = async (req, res) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
            }

            const { EntidadNegocioId, ...actualizacion } = data;

            const entidadNegocio = await EntidadNegocio.findByPk(EntidadNegocioId);

            if (!entidadNegocio) {
                return res.status(404).json({ error: 'Entidad de negocio no encontrada' });
            }

            await entidadNegocio.update(actualizacion);

            console.log('Entidad de negocio editada con éxito');
            return res.json({ success: true, data: entidadNegocio.toJSON() });
        } catch (error) {
            console.error('Error al editar entidad de negocio:', error.message);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };

    const desactivarRFC = async (req, res) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
            }
            const entidadNegocio = await EntidadNegocio.findByPk(data.EntidadNegocioId);

            if (!entidadNegocio) {
                return res.status(404).json({ error: 'Entidad de negocio no encontrada' });
            }

            entidadNegocio.Borrrado = true;
            entidadNegocio.BorradoPor = data.BorradoPor;

            await entidadNegocio.save();

            console.log('Entidad de negocio desactivada con éxito');

            return res.status(200).json({ message: 'Entidad de negocio desactivada: ' + data.EntidadNegocioId });
        } catch (error) {
            console.error('Error al desactivar entidad de negocio:', error.message);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };
    

    const buscarIdRFC = async (req, res) => {
        try{ 
            const data = req.body;
            if(!data) {
                return res.status(400).json({error: 'Cuerpo de la peticion invalida'});
            }
            const result = await EntidadNegocio.findAll({
                attributes: ['EntidadNegocioId', 'EsPropietario', 'RFC', 'NombreComercial', 'ClavePais', 'TaxId', 'ClaveRegimenFiscal', 'PersonaFisica', 'PersonaMoral', 'NombreOficial', 'Estatus'],
                where: {
                    RFC: data.RFC
                },
            });
            res.status(201).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar el RFC de la empresa', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const obtenerDescripcion = async (req, res) => {
        try {
            const descripcion = await regimenFiscal.findAll({
                attributes: ['Descripcion'],
            });
            res.json(descripcion);
        } catch (error) {
            console.log('Error al obtener la descripcion del regimen fiscal', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    const buscarDescripcion = async (req, res) => {
        try{ 
            const data = req.body;
            if(!data) {
                return res.status(400).json({error: 'Cuerpo de la peticion invalida'});
            }
            const result = await regimenFiscal.findAll({
                attributes: ['Descripcion'],
                where: {
                    ClaveRegimenFiscal: data.ClaveRegimenFiscal
                },
            });
            res.status(201).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar la descripcion del regimen fiscal', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const crearDescripcion = async (req, res) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la peticion invalida' });
            }
            const result = await regimenFiscal.create({
                ClaveRegimenFiscal: data.ClaveRegimenFiscal,
                Descripcion: data.Descripcion
            });
            res.status(201).json({ success: true, data: result.toJSON() });
        } catch (error) {
            console.log('Error al crear la descripcion del regimen fiscal', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    const editarDescripcion = async (req, res) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
            }

            const { ClaveRegimenFiscal, ...actualizacion } = data;

            const regimenFiscal = await regimenFiscal.findByPk(ClaveRegimenFiscal);

            if (!regimenFiscal) {
                return res.status(404).json({ error: 'Regimen fiscal no encontrado' });
            }

            await regimenFiscal.update(actualizacion);

            console.log('Regimen fiscal editado con éxito');
            return res.json({ success: true, data: regimenFiscal.toJSON() });
        } catch (error) {
            console.error('Error al editar regimen fiscal:', error.message);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };

    const desactivarDescripcion = async (req, res) => {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
            }
            const regimenFiscal = await regimenFiscal.findByPk(data.ClaveRegimenFiscal);

            if (!regimenFiscal) {
                return res.status(404).json({ error: 'Regimen fiscal no encontrado' });
            }

            regimenFiscal.Borrrado = true;
            regimenFiscal.BorradoPor = data.BorradoPor;

            await regimenFiscal.save();

            console.log('Regimen fiscal desactivado con éxito');

            return res.status(200).json({ message: 'Regimen fiscal desactivado: ' + data.ClaveRegimenFiscal });
        } catch (error) {
            console.error('Error al desactivar regimen fiscal:', error.message);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };

    const obtenerPais = async (req, res) => {
        try{ 
            const pais = await Pais.findAll({
                attributes: ['Descripcion'],
            });
            res.json(pais);
        } catch (error) {
            console.log('Error al obtener el pais', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    const buscarPais = async (req, res) => {
        try{ 
            const data = req.body;
            if(!data) {
                return res.status(400).json({error: 'Cuerpo de la peticion invalida'});
            }
            const result = await Pais.findAll({
                attributes: ['Descripcion'],
                where: {
                    ClavePais: data.ClavePais
                },
            });
            res.status(201).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar el pais', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const obtenerPersonaFisica = async (req, res) => {
        try{ 
            const personaFisica = await EntidadNegocio.findOne({
                attributes: ['PersonaFisica'],
            });
            res.json(personaFisica);
        } catch (error) {
            console.log('Error al obtener la persona fisica', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const buscarPersonaFisica = async (req, res) => {
        try{ 
            const data = req.body;
            if(!data) {
                return res.status(400).json({error: 'Cuerpo de la peticion invalida'});
            }
            const result = await EntidadNegocio.findAll({
                attributes: ['PersonaFisica'],
                where: {
                    PersonaFisica: data.PersonaFisica
                },
            });
            res.status(201).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar la persona fisica', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    const obtenerPersonaMoral = async (req, res) => {
        try{
            const personaMoral = await EntidadNegocio.findAll({
                attributes: ['PersonaMoral'],
            });
            res.json(personaMoral);
        } catch (error) {
            console.log('Error al obtener la persona moral', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const buscarPersonaMoral = async (req, res) => {
        try{ 
            const data = req.body;
            if(!data) {
                return res.status(400).json({error: 'Cuerpo de la peticion invalida'});
            }
            const result = await EntidadNegocio.findOne({
                attributes: ['PersonaMoral'],
                where: {
                    PersonaMoral: data.PersonaMoral
                },
            });
            res.status(201).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar la persona moral', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const obtenerTaxId = async (req, res) => {
        try{ 
            const taxId = await EntidadNegocio.findAll({
                attributes: ['TaxId']
            });
            res.json(taxId);
        } catch (error) {
            console.log('Error al obtener el tax id', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const buscarTaxId = async (req, res) => {
        try{ 
            const data = req.body;
            if(!data) {
                return res.status(400).json({error: 'Cuerpo de la peticion invalida'});
            }
            const result = await EntidadNegocio.findAll({
                attributes: ['TaxId'],
                where: {
                    TaxId: data.TaxId
                },
            });
            res.status(201).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar el tax id', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const obtenerRegimenFiscal = async (req, res) => {
        try {
            const regimenFiscal = await EntidadNegocio.findAll({
                attributes: ['ClaveRegimenFiscal'],
            });
            res.json(regimenFiscal);
        } catch (error) {
            console.log('Error al obtener el regimen fiscal', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };
    
    const buscarRegimenFiscal = async (req, res) => {
        try{ 
            const data = req.body;
            if(!data) {
                return res.status(400).json({error: 'Cuerpo de la peticion invalida'});
            }
            const result = await EntidadNegocio.findAll({
                attributes: ['ClaveRegimenFiscal'],
                where: {
                    ClaveRegimenFiscal: data.ClaveRegimenFiscal
                },
            });
            res.status(201).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar el regimen fiscal', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const obtenerNombreComercial = async (req, res) => {
        try {
            const nombreComercial = await EntidadNegocio.findAll({
                attributes: ['NombreComercial'],
            });
            res.json(nombreComercial);
        } catch (error) {
            console.log('Error al obtener el nombre comercial', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    const buscarNombreComercial = async (req, res) => {
        try{ 
            const data = req.body;
            if(!data) {
                return res.status(400).json({error: 'Cuerpo de la peticion invalida'});
            }
            const result = await EntidadNegocio.findAll({
                attributes: ['NombreComercial'],
                where: {
                    NombreComercial: data.NombreComercial
                },
            });
            res.status(201).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar el nombre comercial', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };


    export const methods = {
        obtenerIdEmpresa,
        buscarIdEmpresa,
        crearIdEmpresa,
        editarIdEmpresa,
        desactivarIdEmpresa,
        obtenerRFC,
        buscarIdRFC,
        crearRFC,
        editarRFC,
        desactivarRFC,
        obtenerDescripcion,
        buscarDescripcion,
        crearDescripcion,
        editarDescripcion,
        desactivarDescripcion,
        obtenerPais,
        buscarPais,
        obtenerPersonaFisica,
        buscarPersonaFisica,
        obtenerPersonaMoral,
        buscarPersonaMoral,
        obtenerTaxId,
        buscarTaxId,
        obtenerRegimenFiscal,
        buscarRegimenFiscal,
        obtenerNombreComercial,
        buscarNombreComercial
    }

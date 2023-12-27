import { EntidadNegocio } from "../models/orgEntidadesnegocio.model.js";
import { regimenFiscal } from "../models/sat.regimen.fiscal.model.js";
import { Pais } from "../models/sat.pais.model.js";
import { Domicilio } from "../models/orgDomicilios.model.js";

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
        console.log('aqui estoy idempresa');
        try{
           const id = req.params.id;
           if(!id) {
            return res.status(400).json({error: 'ID de la entidad de negocio no proporcionado'});
           }
           const result = await EntidadNegocio.findOne({
            attributes: ['EntidadNegocioId', 'EsPropietaria', 'RFC', 'NombreComercial', 'ClavePais', 'TaxId', 'ClaveRegimenFisca', 'PersonaFisica', 'PersonalMoral', 'NombreOficial', 'Estatus'],
            where: {
                EntidadNegocioId: id
            },
        });
        if (!result) {
            return res.status(404).json({error: 'No se encontró la entidad de negocio con el ID proporcionado'});
        }
        res.status(200).json({success: true, data: result});
        } catch (error) {
            console.log('Error al buscar el id de la empresa', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    };

    // funcion original
    // const crearIdEmpresa = async (req, res) => {
    //     try {
    //         const data = req.body;
    //         if (!data) {
    //             return res.status(400).json({ error: 'Invalid request, missing body data' });
    //         }
    
    //         const nuevaEntidad = await EntidadNegocio.create(data);
    //         console.log('Entidad de negocio creada con éxito');
    //         return res.status(201).json({ success: true, data: nuevaEntidad.toJSON() });
    //     } catch (error) {
    //         console.error('Error al crear entidad de negocio:', error.message);
    //         res.status(500).json({ success: false, error: 'Internal Server Error' });
    //     }
    // };

    // con domiclio 
    // const crearIdEmpresa = async (req, res) => {
    //     try {
    //         const data = req.body;
    //         if (!data) {
    //             return res.status(400).json({ error: 'Invalid request, missing body data' });
    //         }
    
    //         const nuevaEntidad = await EntidadNegocio.create(data);
    //         console.log('Entidad de negocio creada con éxito');
    //         return res.status(201).json({ success: true, data: nuevaEntidad.toJSON() });
    //     } catch (error) {
    //         console.error('Error al crear entidad de negocio:', error.message);
    //         console.error('Detalles del error:', error); // Imprimir el error completo
    //         res.status(500).json({ success: false, error: 'Internal Server Error' });
    //     }
    // };


    // funcion con domicilio
    // const crearIdEmpresa = async (req, res) => {
    //     try {
    //         const entidadData = req.body;
    
    //         if (!entidadData) {
    //             return res.status(400).json({ error: 'Invalid request, missing entity data' });
    //         }
    
    //         const nuevaEntidad = await EntidadNegocio.create(entidadData);
    //         console.log('Entidad de negocio creada con éxito');

    //         const nuevoDomicilio = await Domicilio.create({
    //             EntidadNegocioId: nuevaEntidad.EntidadNegocioId,
    //             SucursalId: 1,
    //             AlmacenId: 1,
    //             Calle: 'Calle predeterminada',
    //             NumeroExt: '0',
    //             NumeroInt: '0',
    //             CodigoPostal: '00000',
    //             ClaveEstado: 'EST',
    //             ClaveMunicipio: 'MUN',
    //             ClaveLocalidad: 'LOC',
    //             ClaveColonia: 'COL',
    //             ClavePais: 'PAIS'
    //         });
    //         console.log('Domicilio creado con éxito');
    
    //         return res.status(201).json({ success: true, data: { entidad: nuevaEntidad, domicilio: nuevoDomicilio } });
    //     } catch (error) {
    //         console.error('Error al crear entidad de negocio:', error.message);
    //         console.error('Detalles del error:', error); // Imprimir el error completo
    //         res.status(500).json({ success: false, error: 'Internal Server Error' });
    //     }
    // };

    const crearIdEmpresa = async (req, res) => {
        try {
    

        const { entidad } = req.body

            const propiedadesEntidad = {
                ClavePais: entidad.ClavePais,
                EsPropietaria: entidad.EsPropietaria || false,
                ClaveRegimenFisca: entidad.ClaveRegimenFisca,
                NombreComercial: entidad.NombreComercial,
                NombreOficial: entidad.NombreOficial || '',
                TaxId: entidad.TaxId,
                PersonaFisica: entidad.PersonaFisica,
                PersonalMoral: entidad.PersonalMoral,
                RFC: entidad.RFC || '',
                Estatus: entidad.Estatus,
                logo: entidad.logo,
                CreadoPor: entidad.CreadoPor,
                ActualizadoPor: entidad.ActualizadoPor,
                BorradoPor: entidad.BorradoPor,
                BorradoEn: entidad.BorradoEn
            }
            // console.log(entidad1)
           const resultEntidad = await EntidadNegocio.create(propiedadesEntidad);
            const { dataValues } = resultEntidad
            console.log('hola soy entidad', dataValues.EntidadNegocioId)
            const empresa = dataValues

        const { domicilio } = req.body

            const propiedadesDomicilio = {
                EntidadNegocioId: empresa.EntidadNegocioId,
                SucursalId: domicilio.SucursalId || 1010, // no hay datos de sucursal todavia
                AlmacenId: domicilio.AlmacenId || 12, // no hay datos de almacen todavia
                Calle: domicilio.Calle,
                NumeroExt: domicilio.NumeroExt,
                NumeroInt: domicilio.NumeroInt,
                CodigoPostal: domicilio.CodigoPostal,
                ClaveEstado: domicilio.ClaveEstado,
                ClaveMunicipio: domicilio.ClaveMunicipio,
                ClaveLocalidad: domicilio.ClaveLocalidad,
                ClaveColonia: domicilio.ClaveColonia,
                ClavePais: domicilio.ClavePais
            }
            
            const resultDomicilio = await Domicilio.create(propiedadesDomicilio)
            console.log('hola soy domicilio', resultDomicilio.DomicilioId)
            console.log(resultDomicilio)

            
                return res.status(200).json({
                    status: "Ok",
                    message: "Entidad de negocio creada con éxito",
                    empresa: resultEntidad,
                    domicilio: resultDomicilio
                });
            } catch (error) {
                console.error('Error al crear entidad de negocio:', error.stack);
                res.status(500).json({ success: false, error: error.stack });
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
        console.log('aqui estoy desactivar empresa');
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
            }
            const entidad = await EntidadNegocio.findByPk(data.EntidadId);
    
            if (!entidad) {
                return res.status(404).json({ error: 'Entidad de negocio no encontrada' });
            }
    
            entidad.Borrado = true;
            entidad.BorradoPor = data.BorradoPor;
            entidad.BorradoEn = new Date();
    
            await entidad.save();
    
            console.log('Entidad de negocio desactivada con éxito');
    
            return res.json({ message: 'Entidad de negocio desactivada: ' + data.EntidadId });
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
        try {
            const rfc = req.params.rfc;
            if (!rfc) {
                return res.status(400).json({ error: 'RFC no proporcionado' });
            }
            const result = await EntidadNegocio.findOne({
                attributes: ['EntidadNegocioId', 'EsPropietaria', 'RFC', 'NombreComercial', 'ClavePais', 'TaxId', 'ClaveRegimenFisca', 'PersonaFisica', 'PersonalMoral', 'NombreOficial', 'Estatus'],
                where: {
                    RFC: rfc
                },
            });
            if (!result) {
                return res.status(404).json({ error: 'No se encontró la entidad de negocio con el RFC proporcionado' });
            }
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.log('Error al buscar la empresa por RFC', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
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
    const obtenerRegimenesFiscales = async (req, res) => {
        try {
            const regimenes = await regimenFiscal.findAll();
            res.json(regimenes);
        } catch (error) {
            console.log('Error al obtener los regímenes fiscales', error.message);
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
        obtenerRegimenesFiscales,
        buscarRegimenFiscal,
        obtenerNombreComercial,
        buscarNombreComercial
    }

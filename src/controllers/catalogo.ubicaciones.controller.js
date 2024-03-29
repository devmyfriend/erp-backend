import { Op } from 'sequelize';
import { Ubicaciones } from '../models/cat.ubicaciones.model.js';

const findAllUbications = async (req, res) => {
	const page = Number(req.params.page) || 1;
	const limit = 10;
	const offset = (page - 1) * limit;

	try {
		const { count, rows } = await Ubicaciones.findAndCountAll({
			limit,
			offset,
			attributes: ['UbicacionId', 'Nombre'],
		});

		const totalPages = Math.ceil(count / limit);

		return res.status(200).json({
			info: {
				totalPages,
				currentPage: page,
				totalItems: count,
			},
			items: rows,
		});
	} catch (error) {
		console.error('Error al obtener las ubicaciones', error);
		return res.status(500).json({ error: 'Error al obtener las ubicaciones' });
	}
};

const findUbicationByName = async (req, res) => {
    const { Nombre } = req.params;

    try {
        const ubicacion = await Ubicaciones.findOne({
            where: {
                Nombre: {
                    [Op.like]: `%${Nombre}%`,
                },
                Borrado: 0,
            },
		attributes: ['UbicacionId', 'Nombre'],
			paginate: false,
        });

        if (!ubicacion) {
            return res.status(400).json({ message: 'La ubicación no existe' });
        }

        
        const datosJSON = {
            UbicacionId: ubicacion.UbicacionId,
            Nombre: ubicacion.Nombre,
        };

        return res.status(200).json(datosJSON);
    } catch (error) {
        console.error('Error al obtener la ubicación', error.message);
        return res.status(500).json({ error: 'Error al obtener la ubicación' });
    }
};

const createUbication = async (req, res) => {
	const ubicacionBody = req.body;
	try {
		const validateUbicacion = await Ubicaciones.findOne({
			where: {
				Nombre: ubicacionBody.Nombre,
				Borrado: 0,
			},
		});

		if (validateUbicacion) {
			return res.status(400).json({ message: 'La ubicación ya existe' });
		}

		ubicacionBody.CreadoEn = new Date()
		const ubicacion = await Ubicaciones.create(ubicacionBody);

		return res.status(201).json(ubicacion);
	} catch (error) {
		console.error('Error al crear la ubicación', error.message);
		return res.status(500).json({ error: 'Error al crear la ubicación' });
	}
};

const updateUbication = async (req, res) => {
	const ubicacionBody = req.body;

	try {
		const validateUbicacion = await Ubicaciones.findOne({
			where: {
				UbicacionId: ubicacionBody.UbicacionId,
				Borrado: 0,
			},
		});

		if (!validateUbicacion) {
			return res.status(400).json({ error: 'La ubicación no existe' });
		}

		const validateUbicacionName = await Ubicaciones.findOne({
			where: {
				Nombre: ubicacionBody.Nombre,
				Borrado: 0,
			},
		});

		if (validateUbicacionName) {
			return res
				.status(400)
				.json({ error: 'El nombre de la ubicacion ya está en uso' });
		}
		
		ubicacionBody.ActualizadoEn = new Date()
		const ubicacion = await Ubicaciones.update(ubicacionBody, {
			where: {
				UbicacionId: ubicacionBody.UbicacionId,
			},
		});

		return res
			.status(200)
			.json({ message: 'Ubicación actualizada', ubicacion });
	} catch (error) {
		console.error('Error al actualizar la ubicación', error.message);
		return res.status(500).json({ error: 'Error al actualizar la ubicación' });
	}
};

const deleteUbication = async (req, res) => {
	const { UbicacionId, BorradoPor } = req.body;

	try {
		const ubicacion = await Ubicaciones.findOne({
			where: {
				UbicacionId: UbicacionId,
				Borrado: 0,
			},
		});

		if (!ubicacion) {
			return res.status(400).json({ error: 'La ubicación no existe' });
		}

		ubicacion.Borrado = 1;
		ubicacion.BorradoPor = BorradoPor;
		ubicacion.BorradoEn = new Date();
		await ubicacion.save();

		return res
			.status(200)
			.json({ error: 'Ubicación eliminada', UbicacionId: UbicacionId });
	} catch (error) {
		console.error('Error al eliminar la ubicación', error.message);
		return res.status(500).json({ error: 'Error al eliminar la ubicación' });
	}
};

export const methods = {
	findAllUbications,
	findUbicationByName,
	createUbication,
	updateUbication,
	deleteUbication,
};

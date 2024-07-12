import {EmpresaEmails, Email, FormaDePago, MetodoDePago, ClaveUnidad, ProductosServicios } from '../../models/index.js';

const findEmpresaEmail = async (req, res, next) => {
  try {
    const empresaEmail = await EmpresaEmails.findOne({
      where: { EmailId: req.body.EmailId },
    });

    if (!empresaEmail) {
      return res.status(404).json({ status: 404, message: 'El email no existe' });
    }

    req.empresaEmail = empresaEmail;
    next();
  } catch (error) {
    next(error);
  }
};

const findEmail = async (req, res, next) => {
  try {
    const email = await Email.findOne({
      where: { EmailId: req.body.EmailId },
    });

    if (!email) {
      return res.status(404).json({ status: 404, message: 'El email no existe' });
    }

    req.email = email;
    next();
  } catch (error) {
    next(error);
  }
};

const findFormaDePago = async (req, res, next) => {
  try {
    const formaDePago = await FormaDePago.findOne({
      where: { ClaveFormaPago: req.body.ClaveFormaPago, Activo: 1 },
    });

    if (formaDePago) {
      return res.status(400).json({ error: 'Ya existe un metodo de pago con esa clave' });
    }

    req.formaDePago = formaDePago;
    next();
  } catch (error) {
    next(error);
  }
};

const findMetodoDePago = async (req, res, next) => {
  try {
    const metodoDePago = await MetodoDePago.findOne({
      where: { ClaveMetodoPago: req.body.ClaveMetodoPago, Activo: 1 },
    });

    if (metodoDePago) {
      return res.status(400).json({ error: 'Ya existe un tipo de pago con esa clave' });
    }

    req.metodoDePago = metodoDePago;
    next();
  } catch (error) {
    next(error);
  }
};

const findClaveUnidad = async (req, res, next) => {
  try {
      const claveUnidad = await ClaveUnidad.findOne({
          where: { ClaveUnidadSat: req.body.ClaveUnidadSat, Activo: 1 },
      });

      if (claveUnidad) {
          return res.status(400).json({ error: 'La clave de unidad ya existe' });
      }

      req.claveUnidad = claveUnidad;
      next();
  } catch (error) {
      next(error);
  }
};

const findProductServicesByCode = async (req, res, next) => {
  try {
    const productService = await ProductosServicios.findOne({
      where: { ClaveProductoServicio: req.body.ClaveProductoServicio, Activo: 1 },
    });

    if (productService) {
      return res.status(400).json({ error: 'Ya existe un producto o servicio con esa clave' });
    }

    req.productService = productService;
    next();
  } catch (error) {
    next(error);
  }
};
  
  export { findEmpresaEmail, findEmail, findFormaDePago, findMetodoDePago, findClaveUnidad, findProductServicesByCode };

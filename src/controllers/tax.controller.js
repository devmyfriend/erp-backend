import { TaxModel } from '../models/tax.model.js'
const findTax = async (req, res) => {

    const data = await TaxModel.findAll({
        where: {
            Activo: 1
        }
    })

    return res.status(200).json(data)
}


export const methods = {
    findTax
}
const { Router } = require( 'express' )
const { test } = require('../controllers/test.controller')


const router = Router()

router.get('/', test)

module.exports = router
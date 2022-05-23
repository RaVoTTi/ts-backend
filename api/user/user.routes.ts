// EXPRESS
import { Router } from 'express'
import { check } from 'express-validator'

// MIDDLEWARES
import { validateEmail } from './user.validators'
import { validateCamps } from '../../middlewares/validate-camps'
import { clearCamps } from '../../middlewares/clear-camps'
import { isAdminRole } from '../../middlewares/validate-admin-role'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'

// ROUTES
import {
    userAddressPutByJWT,
    userCryptoAddressPutByJWT,
    userGetByJWT,
    userPhonePutByJWT,

} from './user.controllers'

// PATH /api/user
export const router = Router()

// ROUTES


router.get('/', [validateUserJwt], userGetByJWT)

router.put(
    '/phone/',
    [
        validateUserJwt,
        check('phone', 'phone is required').isNumeric(),
        validateCamps,
    ],
    userPhonePutByJWT
)
router.put(
    '/address/',
    [
        validateUserJwt,
        check('apartament', 'The apartament is required').isString(),
        check('city', 'The city is required').isString(),
        check('zip', 'The zip is required').isString(),
        check('country', 'The country is required').isString(),
        check('street', 'The street is required').isString(),
        validateCamps,
    ],
    userAddressPutByJWT
)
router.put(
    '/cryptoaddress/',
    [
        validateUserJwt,
        check('cryptoType', 'The cryptoType is required').isString(),
        check('wallet', 'The wallet is required').isString(),
        validateCamps,
    ],
    userCryptoAddressPutByJWT
)


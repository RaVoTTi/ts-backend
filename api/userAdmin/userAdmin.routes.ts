// EXPRESS
import { Router } from 'express'
import { check } from 'express-validator'

// MIDDLEWARES
import { validateEmail } from './userAdmin.validators'
import { validateCamps } from '../../middlewares/validate-camps'
import { isAdminRole } from '../../middlewares/validate-admin-role'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'

// ROUTES
import {
    userDelete,
    userGet,
    userGetById,
    userGetCount,
    userPostByAdmin,
    userPutByAdmin,
} from './userAdmin.controllers'

// PATH /api/user
export const router = Router()

// ROUTES
router.get(
    '/',
     [validateUserJwt, isAdminRole],
    userGet
)

router.get(
    '/count',
     [validateUserJwt, isAdminRole],
    userGetCount
)

router.get(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "Id isn't valid").isMongoId(),
        validateCamps,
    ],
    userGetById
)
router.post(
    '',
    [
        validateUserJwt,
        isAdminRole,
        check('name', 'Name is required').isString(),
        check('lastName', 'lastName is required').isString(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password need to be more than 5 char').isLength({
            min: 6,
        }),
        check('phone', 'The phone is required').notEmpty(),
        check('state', 'The zip is required').isBoolean(),
        check('isAdmin', 'The country is required').isBoolean(),
        check('phone', 'phone is required').isNumeric(),
        // check('street', 'The street is required').isString(),
        // check('apartament', 'The apartament is required').isString(),
        // check('city', 'The city is required').isString(),
        // check('zip', 'The zip is required').isString(),
        // check('country', 'The country is required').isString(),

        validateCamps,
        check('email').custom(validateEmail).withMessage('Email is in used'),
        validateCamps,
    ],
    userPostByAdmin
)
router.put(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "Id isn't valid").isMongoId(),
        validateCamps,
        check('name', 'Name is required').isString(),
        check('lastName', 'lastName is required').isString(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password need to be more than 5 char').isLength({
            min: 6,
        }),
        check('phone', 'The phone is required').notEmpty(),
        check('state', 'The zip is required').isBoolean(),
        check('isAdmin', 'The country is required').isBoolean(),
        // check('phone', 'phone is required').isNumeric(),
        // check('street', 'The street is required').isString(),
        // check('apartament', 'The apartament is required').isString(),
        // check('city', 'The city is required').isString(),
        // check('zip', 'The zip is required').isString(),
        // check('country', 'The country is required').isString(),

        validateCamps,
    ],
    userPutByAdmin
)

router.delete(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "Id isn't valid").isMongoId(),
        validateCamps,
    ],
    userDelete
)

// router.put(
//     '/address/:id',
//     [
//         validateUserJwt,
//         isAdminRole,
//         check('id', "Id isn't valid").isMongoId(),
//         validateCamps,
//         check('apartament', 'The apartament is required').isString(),
//         check('city', 'The city is required').isString(),
//         check('zip', 'The zip is required').isString(),
//         check('country', 'The country is required').isString(),
//         check('street', 'The street is required').isString(),
//         validateCamps,
//     ],
//     userAddressPut
// )
// router.put(
//     '/cryptoaddress/:id',
//     [
//         validateUserJwt,
//         isAdminRole,
//         check('id', "Id isn't valid").isMongoId(),
//         validateCamps,
//         check('cryptoType', 'The cryptoType is required').isString(),
//         check('wallet', 'The wallet is required').isString(),

//         validateCamps,
//     ],
//     userCryptoAddressPut
// )
// router.put(
//     '/phone/:id',
//     [
//         // validateUserJwt,
//         // isAdminRole,
//         check('id', "Id isn't valid").isMongoId(),
//         validateCamps,
//         check('phone', 'phone is required').isNumeric(),
//         validateCamps,
//     ],
//     userPhonePut
// )

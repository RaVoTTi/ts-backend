// EXPRESS
import { Router } from 'express'
import { check } from 'express-validator'

// VALIDATORS
import { validateAutor } from './autor.validators'
import { validateCamps } from '../../middlewares/validate-camps'

// CONTROLLERS
import {
    autorDelete,
    autorGet,
    autorGetById,
    autorGetCount,
    autorPost,
    autorPut,
} from './autor.controllers'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import { isAdminRole } from '../../middlewares/validate-admin-role'

// PATH /api/autor
export const router = Router()

// ROUTES
// ADMIN
router.get(
    '/',
    [validateUserJwt, isAdminRole],
    autorGet
)
router.get(
    '/count',
    [validateUserJwt, isAdminRole],
    autorGetCount
)

router.get(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    autorGetById
)
router.post(
    '',
    [
        validateUserJwt,
        isAdminRole,
        check('name', 'El name es obligatorio').notEmpty(),
        check('name').custom(validateAutor),
        check('state', 'El state es obligatorio').isBoolean(),
        check('urlWiki', 'El urlWiki es obligatorio').isString(),

        validateCamps,
    ],
    autorPost
)
router.put(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
        check('name', 'El name es obligatorio').notEmpty(),
        check('state', 'El state es obligatorio').isBoolean(),
        check('urlWiki', 'El urlWiki es obligatorio').isString(),
        validateCamps,
    ],
    autorPut
)

router.delete(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    autorDelete
)

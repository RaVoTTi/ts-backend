// EXPRESS
import { Router } from 'express'
import { check } from 'express-validator'

// VALIDATORS
import { validateBook, validateBookIdName } from '../book/book.validators'
import { validateCamps } from '../../middlewares/validate-camps'

// CONTROLLERS
import {
    myOrderGet,
    myOrderGetById,
    myOrderPost,
    orderDelete,
    orderGet,
    orderGetById,
    orderGetCount,
    orderGetIncome,
    orderPost,
    orderPatch,
} from './order.controllers'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import { isAdminRole } from '../../middlewares/validate-admin-role'

// PATH /api/order
export const router = Router()

// ROUTES

// NORMAL USER
router.get(
    '/user',
    [validateUserJwt],
    myOrderGet
)
router.get(
    '/user/:id',
    [
        validateUserJwt,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    myOrderGetById
)
router.post(
    '/checkout/:id',
    [
        validateUserJwt,
        check('id', "it isn't a valid id").isMongoId(),
        check('addressLTC', "it isn't a valid LTC address").notEmpty(),
        check('price', "it isn't a valid price").notEmpty(),
        validateCamps,
        check('addressLTC', "it isn't a valid LTC addressssss").isString(),
        check('price', "it isn't a valid price").isNumeric(),
        validateCamps,
    ],
    myOrderPost
)

// ADMIN
router.get('/admin', [validateUserJwt, isAdminRole], orderGet)
router.get('/admin/count', [validateUserJwt, isAdminRole], orderGetCount)
router.get('/admin/income', [validateUserJwt, isAdminRole], orderGetIncome)
router.get(
    '/admin/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    orderGetById
)
router.post(
    '/admin/',
    [
        validateUserJwt,
        isAdminRole,
        check('book', 'The book is required').notEmpty(),
        check('state', 'The state is required').notEmpty(),
        check('price', 'The price is required').notEmpty(),
        // check('condition', 'The description is required').notEmpty(),
        check('user', 'The user is required').notEmpty(),
        validateCamps,
        check('book', 'The book is required').isMongoId(),
        check('user', 'The user is required').isMongoId(),
        check('state', 'The state is required').isBoolean(),
        check('price', 'The price is required').isNumeric(),
        // check('condition', 'The description is required').isNumeric(),
        validateCamps,
    ],
    orderPost
)
router.patch(
    '/admin/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),

        validateCamps,

        check('condition', 'The condition is required').notEmpty(),
        validateCamps,

        check('condition', 'The condition is invalid').isIn([0, 1, 2, 3, 4]),

        validateCamps,
    ],
    orderPatch
)

router.delete(
    '/admin/:id',
    [
        validateUserJwt,
        isAdminRole,

        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    orderDelete
)

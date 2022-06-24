// EXPRESS
import { Router } from 'express'
import { check, body } from 'express-validator'

// VALIDATORS
import { validateBook } from '../book/book.validators'
import { validateCamps } from '../../middlewares/validate-camps'

// CONTROLLERS
import {
    bookDelete,
    bookGet,
    bookGetById,
    bookGetByIdAdmin,
    bookGetCount,
    bookPost,
    bookPut,
} from './book.controllers'
import { clearCamps } from '../../middlewares/clear-camps'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import { isAdminRole } from '../../middlewares/validate-admin-role'

// PATH /api/book
export const router = Router()

// ROUTES

// NO REGISTER
router.get('/', bookGet)
router.get(
    '/:id',
    [check('id', "it isn't a valid id").isMongoId(), validateCamps],
    bookGetById
)

// ADMIN
router.get(
    '/admin/count',
    //  [validateUserJwt, isAdminRole],
    bookGetCount
)
router.get(
    '/admin/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),

        validateCamps,
    ],
    bookGetByIdAdmin
)
router.post(
    '',
    [
        validateUserJwt,
        isAdminRole,

        // validateCamps,

        check('name', 'The name is required').notEmpty(),
        check('description', 'The description is required').notEmpty(),
        check('content', 'The content is required').notEmpty(),
        check('subject', 'The subject have to be mongoId').notEmpty(),
        check('autor', 'The autor is required').notEmpty(),
        check('minPrice', 'The price is required').notEmpty(),
        check('maxPrice', 'The price is required').notEmpty(),
        check('state', 'The state is required').notEmpty(),
        check('isFeatured', 'The isFeatured is required').notEmpty(),
        check('evaluation', 'The Evaluation is required').notEmpty(),

        // check('content', 'The content is required').isString(),
        validateCamps,
        check('name', 'The name is required').isString(),
        check('description', 'The description is required').isString(),
        check('content', 'The content is required').isString(),
        check('subject', 'The subject have to be mongoId').isMongoId(),
        check('autor', 'The autor is required').isMongoId(),
        check('minPrice', 'The price is required').isNumeric(),
        check('maxPrice', 'The price is required').isNumeric(),
        check('state', 'The state is required').isBoolean(),
        check('isFeatured', 'The isFeatured is required').isBoolean(),

        // check('content', 'The content is required').isString(),
        validateCamps,
        check('name').custom(validateBook),

        validateCamps,
        clearCamps(['rating', 'dateCreated', 'image', 'numReviews']),
    ],
    bookPost
)

router.put(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),

        validateCamps,
        // uploadOptions.single('image'),
        check('isFeatured', 'The isFeatured is required').isBoolean(),
        check('name', 'The name is required').isString(),
        check('description', 'The description is required').isString(),
        // check('content', 'The content is required').isString(),
        check('content', 'The content is required').isString(),
        check('subject', 'The subject have to be mongoId').isMongoId(),
        check('autor', 'The autor is required').isMongoId(),
        check('minPrice', 'The price is required').isNumeric(),
        check('maxPrice', 'The price is required').isNumeric(),
        // check('evaluation', 'The evaluation is required').isString(),
        check('state', 'The state is required').isBoolean(),
        validateCamps,
        clearCamps(['rating', 'dateCreated', 'numReviews']),
    ],
    bookPut
)

router.delete(
    '/:id',
    [
        validateUserJwt,
        isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    bookDelete
)

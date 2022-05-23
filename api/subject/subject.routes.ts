// EXPRESS
import { Router } from 'express'
import { check } from 'express-validator'

// VALIDATORS
import { validateSubject } from './subject.validators'
import { validateCamps } from '../../middlewares/validate-camps'

// CONTROLLERS
import {
    subjectDelete,
    subjectGet,
    subjectGetById,
    subjectGetCount,
    subjectPost,
    subjectPut,
} from './subject.controllers'
import { validateUserJwt } from '../../middlewares/validate-user-JWT'
import { isAdminRole } from '../../middlewares/validate-admin-role'
import { clearCamps } from '../../middlewares/clear-camps'

// PATH /api/subject
export const router = Router()

// ROUTES

// NO REGISTER
router.get('/', subjectGet)

// ADMIN
router.get(
    '/count',
    [
        // validateUserJwt, isAdminRole
    ],
    subjectGetCount
)
router.get(
    '/:id',
    [
        // validateUserJwt, isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    subjectGetById
)
router.post(
    '',
    [
        // validateUserJwt,
        // isAdminRole,
        check('name', 'The name is required').notEmpty(),
        check('icon', 'The name is required').notEmpty(),

        check('name').custom(validateSubject),
        clearCamps(['state']),
        validateCamps,
    ],
    subjectPost
)
router.put(
    '/:id',
    [
        // validateUserJwt,
        // isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
        check('name', 'The name is required').notEmpty(),
        check('icon', 'The name is required').notEmpty(),

        validateCamps,
    ],
    subjectPut
)

router.delete(
    '/:id',
    [
        // validateUserJwt,
        // isAdminRole,
        check('id', "it isn't a valid id").isMongoId(),
        validateCamps,
    ],
    subjectDelete
)

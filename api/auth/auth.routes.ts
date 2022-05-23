import { loginPost, registerPost } from './auth.controllers'
import { Router } from 'express'
import { validateEmail } from '../user/user.validators'
import { validateCamps } from '../../middlewares/validate-camps'
import { check } from 'express-validator'
import { clearCamps } from '../../middlewares/clear-camps'

// PATH /api/auth/
export const router = Router()

// ROUTES
router.post('/', loginPost)
router.post(
    '/register',
    [
        check('name', 'Name is required').isString(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password need to be more than 5 char').isLength({
            min: 6,
        }),
        check('phone', 'The phone is required').notEmpty(),
        check('phone', 'phone is required').isNumeric(),
        check('street', 'The street is required').isString(),
        check('apartament', 'The apartament is required').isString(),
        check('city', 'The city is required').isString(),
        check('zip', 'The zip is required').isString(),
        check('country', 'The country is required').isString(),
        validateCamps,
        check('email').custom(validateEmail).withMessage('Email is in used'),
        validateCamps,
        clearCamps(['isAdmin', 'state']),
    ],
    registerPost
)


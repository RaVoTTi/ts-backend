// EXPRESS
import { Router } from 'express'
export const router = Router()

// ROUTES
import { router as autorRoute } from './autor/autor.routes'
import { router as authRoute } from './auth/auth.routes'
import { router as bookRoute } from './book/book.routes'
import { router as orderRoute } from './order/order.routes'

import { router as subjectRoute } from './subject/subject.routes'
import { router as userRoute } from './user/user.routes'
import { router as userAdminRoute } from './userAdmin/userAdmin.routes'



// PATH /api/v1/

router.use('/auth', authRoute)
router.use('/autor' , autorRoute)
router.use('/book', bookRoute)
router.use('/order', orderRoute)
router.use('/subject', subjectRoute)
router.use('/user' ,userRoute)
router.use('/user/admin' ,userAdminRoute)



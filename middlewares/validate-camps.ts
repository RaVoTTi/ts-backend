import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const validateCamps = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const errors = result.array().map((n) => n.msg)
        return res.status(400).json({
            ok: false,
            msg: errors,
        })
    }
    next()
}

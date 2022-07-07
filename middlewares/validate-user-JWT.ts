import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../api/user/user.models'

export const validateUserJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const token = req.header('super-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: ["Token doesn't exist"],
            result: [],
        })
    }

    try {
        if (!process.env.PRIVATE_KEY) {
            return res.status(500).json({
                ok: false,
                msg: ["Private Key doesn't exist"],
                result: [],
            })
        }

        const payload = jwt.verify(token, process.env.PRIVATE_KEY) as JwtPayload

        // console.log(payload);
        const { uid } = payload

        const user = await User.findOne({ $and: [{ _id: uid }, { state: true }] })
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: ['Invalid Token'],
                result: [],
            })
        }
        Object.assign(req, { user })
        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: ['Invalid Token'],
            result: [],
        })
    }
}

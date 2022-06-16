import { Request, Response } from 'express'
import resIdError from '../../utils/res-idError'
import { User } from './user.models'

export const userGetByJWT = async (req: Request, res: Response) => {
    const { _id } = req.user

    const user = await User.findOne({ $and: [{ _id }, { state: true }] })

    if (!user) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: user,
    })
}



export const userPhonePutByJWT = async (req: Request, res: Response) => {
    const { user } = req

    const { phone } = req.body

    const newUser = await User.findOneAndUpdate(
        { $and: [{ _id: user._id }, { state: true }] },
        { phone }
    )
    if (!newUser) return resIdError(res)

    res.status(201).json({
        ok: true,
        msg: ['User modificated succesful'],
    })
}
export const userAddressPutByJWT = async (req: Request, res: Response) => {
    const { user } = req

    const { street, apartament, city, zip, country } = req.body

    const address = {
        street,
        apartament,
        city,
        zip,
        country,
    }

    const newUser = await User.findOneAndUpdate(
        { $and: [{ _id: user._id }, { state: true }] },
        { address }
    )
    if (!newUser) return resIdError(res)

    res.status(201).json({
        ok: true,
        msg: ['User modificated succesful'],
    })
}
// export const userCryptoAddressPutByJWT = async (
//     req: Request,
//     res: Response
// ) => {
//     const { user } = req

//     const { cryptoType, wallet } = req.body

//     const cryptoAddress = { cryptoType, wallet }

//     const newUser = await User.findOneAndUpdate(
//         { $and: [{ _id: user._id }, { state: true }] },
//         { cryptoAddress }
//     )
//     if (!newUser) return resIdError(res)

//     res.status(201).json({
//         ok: true,
//         msg: ['User modificated succesful'],
//     })
// }

// export const userDeleteByJWT = async (req: Request, res: Response) => {
//     const { user } = req

//     const newUser = await User.findOneAndUpdate(
//         { $and: [{ _id:user._id }, { state: true }] },
//         { state: false }
//     )

//     if (!newUser) return resIdError(res)

//     res.status(200).json({
//         ok: true,
//         msg: ['User remove succesful'],
//     })
// }

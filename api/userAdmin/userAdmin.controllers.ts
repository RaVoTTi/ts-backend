import { Request, Response } from 'express'
import resIdError from '../../utils/res-idError'
import { User } from '../user/user.models'
import bcrypt from 'bcrypt'

export const userGet = async (req: Request, res: Response) => {
    const query = { state: true }
    const users = await User.find(query).select('-address -cryptoAddress')

    res.status(200).json({
        ok: true,
        msg: [],
        result: users,
    })
}

export const userGetCount = async (req: Request, res: Response) => {
    const users = await User.count()

    res.status(200).json({
        ok: true,
        msg: [],
        result: users,
    })
}

export const userGetById = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const user = await User.findOne({ _id })

    if (!user) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: user,
    })
}

export const userPostByAdmin = async (req: Request, res: Response) => {
    const {
        password: noHashPassword,
        cryptoAddress,
        address,
        ...rest
    } = req.body




    const salt = bcrypt.genSaltSync(7)
    const password = bcrypt.hashSync(noHashPassword, salt)

    const user = new User({
        ...rest,
        address,
        cryptoAddress,
        password,
    })

    await user.save()

    res.status(201).json({
        ok: true,
        msg: ['User created succesful'],
    })
}
export const userPutByAdmin = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const {
        password: noHashPassword,
        email,
        ...rest
    } = req.body
    const emailExist = await User.findOne({ email })
        

    if (emailExist && emailExist._id != _id) {
        return res.status(400).json({
            ok: false,
            msg: [`The email "${email}" is register!!`],
        })
    }
    
    
    
    const salt = bcrypt.genSaltSync(7)
    const password = bcrypt.hashSync(noHashPassword, salt)
    
    const user = await User.findOneAndUpdate({ _id }, { password, ...rest})


    res.status(201).json({
        ok: true,
        msg: ['User updated succesful'],
    })
}

export const userDelete = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const user = await User.findOneAndDelete({ _id })

    if (!user) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: ['User remove succesful'],
    })
}

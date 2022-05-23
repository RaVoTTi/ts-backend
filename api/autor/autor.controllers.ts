import { Request, Response } from 'express'
import resIdError from '../../utils/res-idError'
import Autor from './autor.models'

export const autorGet = async (req: Request, res: Response) => {
    const { state } = req.query
    let query
    if (state === 'both') {
        query = {}
    } else {
        query = { state: true }
    }
    const autors = await Autor.find(query)
    return res.status(200).json({
        ok: true,
        msg: [],
        result: autors,
    })
}
export const autorGetCount = async (req: Request, res: Response) => {
    const autors = await Autor.count()
    return res.status(200).json({
        ok: true,
        msg: [],
        result: autors,
    })
}

export const autorGetById = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const autor = await Autor.findOne({ _id })

    if (!autor) return resIdError(res)

    return res.status(200).json({
        ok: true,
        msg: [],
        result: autor,
    })
}

export const autorPost = async (req: Request, res: Response) => {
    const autor = new Autor(req.body)

    await autor.save()

    res.status(201).json({
        ok: true,
        msg: ['The Autor created succesful'],
    })
}

export const autorPut = async (req: Request, res: Response) => {
    const { name, ...rest } = req.body

    const { id: _id } = req.params
    const autorExist = await Autor.findOne({ name })
    if (autorExist && autorExist._id != _id) {
        return res.status(201).json({
            ok: false,
            msg: [`The Subject "${name}" is register`],
        })
    }

    const autor = await Autor.findOneAndUpdate({ _id }, { name, ...rest })
    if (!autor) return resIdError(res)

    res.status(201).json({
        ok: true,
        msg: ['The Autor modificated succesful'],
    })
}

export const autorDelete = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const autor = await Autor.findOneAndDelete({ _id })

    if (!autor) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: ['The Autor remove succesful'],
    })
}

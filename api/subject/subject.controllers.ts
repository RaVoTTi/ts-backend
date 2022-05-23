import { Request, Response } from 'express'
import resIdError from '../../utils/res-idError'
import Subject from './subject.models'

export const subjectGet = async (req: Request, res: Response) => {
    const { state } = req.query
    let query
    if (state === 'both') {
        query = {}
    } else {
        query = { state: true }
    }

    const subjects = await Subject.find(query)

    return res.status(200).json({
        ok: true,
        msg: [],
        result: subjects,
    })
}
export const subjectGetCount = async (req: Request, res: Response) => {
    const subjects = await Subject.count()

    return res.status(200).json({
        ok: true,
        msg: [],
        result: subjects,
    })
}

export const subjectGetById = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const subject = await Subject.findOne({ _id })

    if (!subject) return resIdError(res)

    return res.status(200).json({
        ok: true,
        msg: [],
        result: subject,
    })
}

export const subjectPost = async (req: Request, res: Response) => {
    const { ...rest } = req.body
    const subject = new Subject({ ...rest })

    await subject.save()

    res.status(201).json({
        ok: true,
        msg: ['subject created succesful'],
    })
}

export const subjectPut = async (req: Request, res: Response) => {
    // const name: string = (req.body.name as string).toUpperCase()
    const { name , ...rest } = req.body

    const { id: _id } = req.params
    const nameExist = await Subject.findOne({ name })
    if (nameExist && nameExist._id != _id) {
        return res.status(400).json({
            ok: false,
            msg: [`The Subject "${name}" is register`],
        })
    }

    const subject = await Subject.findOneAndUpdate(
        { _id },
        { name, ...rest }
    )
    if (!subject) return resIdError(res)

    res.status(201).json({
        ok: true,
        msg: ['subject modificated succesful'],
    })
}

export const subjectDelete = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const subject = await Subject.findOneAndDelete(
        { _id }
        )

    if (!subject) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: ['subject remove succesful'],
    })
}

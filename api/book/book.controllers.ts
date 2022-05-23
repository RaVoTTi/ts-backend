import { Response, Request, NextFunction } from 'express'
import fs from 'fs'

import resIdError from '../../utils/res-idError'
import { Book } from '../book/book.models'
import Autor from '../autor/autor.models'
import Subject from '../subject/subject.models'
import { saveFile } from '../../helpers/save-file'

// NO REGISTER

export const bookGet = async (req: Request, res: Response) => {
    const { state } = req.query
    let query
    if (state === 'both') {
        query = {}
    } else {
        query = { state: true }
    }
    const books = await Book.find(query)
        .populate({ path: 'autor', select: 'name' })
        .populate({ path: 'subject', select: ['name'] })
        .select(
            '-content -description -richDescription -evaluation -numReviews '
        )

    return res.status(200).json({
        ok: true,
        msg: [],
        result: books,
    })
}

export const bookGetById = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const book = await Book.findOne({
        $and: [{ _id }, { state: true }, { type: 'BOOK' }],
    })

    if (!book) return resIdError(res)

    return res.status(200).json({
        ok: true,
        msg: [],
        result: book,
    })
}

// ADMIN
export const bookGetByIdAdmin = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const book = await Book.findOne({ $and: [{ _id }, { type: 'BOOK' }] })
        .populate({ path: 'autor', select: 'name' })
        .populate({ path: 'subject', select: 'name' })

    if (!book) return resIdError(res)

    return res.status(200).json({
        ok: true,
        msg: [],
        result: book,
    })
}
export const bookGetCount = async (req: Request, res: Response) => {
    const books = await Book.count()

    return res.status(200).json({
        ok: true,
        msg: [],
        result: books,
    })
}

export const bookPost = async (req: Request, res: Response) => {
    const { autor, content, subject, image: fakeImage, ...rest } = req.body

    const [autorExist, subjectExist] = await Promise.all([
        Autor.findOne({ $and: [{ _id: autor }, { state: true }] }),
        Subject.findOne({ $and: [{ _id: subject }, { state: true }] }),
    ])

    if (!autorExist || !subjectExist) return resIdError(res)
    const relativePath = `/public/uploads/`

    let image: unknown
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        image = `${relativePath}default.jpeg`
    } else {
        try {
            image = `${relativePath}${await saveFile(req.files!)}`
        } catch (error) {
            return res.status(400).json({
                ok: false,
                msg: [error],
            })
        }
    }

    const book = new Book({ autor, content, subject, image, ...rest })

    await book.save()

    res.status(201).json({
        ok: true,
        msg: ['Book created succesful'],
    })
}

export const bookPut = async (req: Request, res: Response) => {
    const { id: _id } = req.params
    const { name, autor, subject, image: fakeImage, ...rest } = req.body

    const [autorExist, subjectExist, nameExist, idExist] = await Promise.all([
        Autor.findOne({ $and: [{ _id: autor }, { state: true }] }),
        Subject.findOne({ $and: [{ _id: subject }, { state: true }] }),
        Book.findOne({ name }),
        Book.findOne({ _id }),

    ])

    if (!autorExist || !subjectExist || !idExist) return resIdError(res)

    if (nameExist && nameExist._id != _id) {
        return res.status(400).json({
            ok: false,
            msg: [`The Book "${name}" is register!!`],
        })
    }
    const relativePath = `/public/uploads/`

    let image: unknown

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    } else {
        try {
            image = `${relativePath}${await saveFile(req.files!)}`
        } catch (error) {
            return res.status(400).json({
                ok: false,
                msg: [error],
            })
        }
    }

    const book = await Book.findOneAndUpdate(
        { _id },
        { autor, subject, image, ...rest },
        {new: true}
    )
    if (!book) return resIdError(res)



    if (idExist.image != book.image && idExist.image !== '/public/uploads/default.jpeg') {
        const pathImage = process.env.PWD + idExist.image
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
        }
    }

    res.status(201).json({
        ok: true,
        msg: ['Book modificated succesful'],
    })
}

export const bookDelete = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const book = await Book.findOneAndDelete({ _id })

    if (!book) return resIdError(res)

    if (book.image && book.image !== '/public/uploads/default.jpeg') {
        const pathImage = process.env.PWD + book.image
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
        }
    }

    res.status(200).json({
        ok: true,
        msg: ['Book remove succesful'],
    })
}

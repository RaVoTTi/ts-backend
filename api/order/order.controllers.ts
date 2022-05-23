import { Request, Response } from 'express'
import resIdError from '../../utils/res-idError'
import { User } from '../user/user.models'
import { Order } from './order.models'
import { Book } from '../book/book.models'

// REGISTER
export const orderGetByJWT = async (req: Request, res: Response) => {
    const { user } = req

    const orders = await Order.find({
        $and: [{ _id: user._id }, { state: true }],
    })

    if (!orders) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: orders,
    })
}
export const orderPostByJWT = async (req: Request, res: Response) => {
    const { user } = req
    const { orderItems, ...rest } = req.body
}
export const orderPatchByJWT = async (req: Request, res: Response) => {
    const { user } = req
    console.log(user._id)
    const { orderItems, ...rest } = req.body
}

// ADMIN

export const orderGet = async (req: Request, res: Response) => {
    const { state } = req.query
    let query
    if (state === 'both') {
        query = {}
    } else {
        query = { state: true }
    }
    const orders = await Order.find(query)
        .populate({ path: 'user', select: ['name', 'lastName'] })
        .populate({ path: 'book', select: ['name'] })

    res.status(200).json({
        ok: true,
        msg: [],
        result: orders,
    })
}

export const orderGetCount = async (req: Request, res: Response) => {
    const { state } = req.query
    let query
    if (state === 'both') {
        query = {}
    } else {
        query = { state: true }
    }
    const orders = await Order.count(query)

    res.status(200).json({
        ok: true,
        msg: [],
        result: orders,
    })
}

export const orderGetById = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const order = await Order.findOne({ _id })
        .populate({ path: 'book', select: ['name', 'minPrice', 'maxPrice'] })
        .populate({
            path: 'user',
            select: ['name', 'lastName', 'email', 'phone'],
        })

    if (!order) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: order,
    })
}

export const orderPost = async (req: Request, res: Response) => {
    const { book, user, price, condition: fakeCondition, state } = req.body

    const condition = 0

    const [userExist, bookExist] = await Promise.all([
        User.findOne({ $and: [{ _id: user }, { state: true }] }),
        Book.findOne({ $and: [{ _id: book }, { state: true }] }),
    ])

    if (!userExist || !bookExist) return resIdError(res)

    if (price < bookExist.minPrice || price > bookExist.maxPrice) {
        return res.status(400).json({
            ok: false,
            msg: ['The price is invalid'],
        })
    }

    const order = new Order({
        condition,
        book,
        price,
        state,
        user,
    })

    await order.save()

    res.status(201).json({
        ok: true,
        msg: ['order created succesful'],
    })
}
export const orderPatch = async (req: Request, res: Response) => {
    const { condition } = req.body
    const { id: _id } = req.params

    const order = await Order.findOneAndUpdate(
        { _id },
        { condition },
        { new: true }
    )
    if (!order) return resIdError(res)


    res.status(201).json({
        ok: true,
        msg: ['Order condition modificated succesful'],
    })
}

export const orderDelete = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const order = await Order.findOneAndDelete({ _id })

    if (!order) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: ['Order remove succesful'],
    })
}

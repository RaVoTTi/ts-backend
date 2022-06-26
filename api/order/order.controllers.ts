import { Request, Response } from 'express'
import resIdError from '../../utils/res-idError'
import { User } from '../user/user.models'
import { Order } from './order.models'
import { Book } from '../book/book.models'

// REGISTER
export const myOrderGet = async (req: Request, res: Response) => {
    const { user } = req
    const { condition } = req.query
    let orders
    if (condition === '1') {
        orders = await Order.find({
            $and: [{ user: user._id }, { state: true }, { condition }],
        })
            .populate({ path: 'book', select: 'name image description' })
            .select('-dateCreated -addressLTC')
    } else if (condition === '0') {
        orders = await Order.find({
            $and: [{ user: user._id }, { state: true }],
        }).populate({ path: 'book', select: 'name image' })
    } else {
        return res.status(400).json({
            ok: false,
            msg: ['Server Error'],
        })
    }

    if (!orders) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: orders,
    })
}
export const myOrderGetById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { user } = req

    const order = await Order.findOne({
        $and: [
            { _id: id },
            { user: user._id },
            { state: true },
            { condition: 1 },
        ],
    }).populate({ path: 'book', select: 'name content evaluation' })

    if (!order) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: order,
    })
}
export const myOrderPost = async (req: Request, res: Response) => {
    const { user } = req
    const { id } = req.params
    const { price, addressLTC } = req.body

    const bookExist = await Book.findOne({
        $and: [{ id }, { state: true }],
    })

    if (!bookExist) return resIdError(res)

    if (price > bookExist.maxPrice || price < bookExist.minPrice) {
        return res.status(400).json({
            ok: false,
            msg: ['The price is invalid'],
        })
    }

    const order = new Order({
        book: id,
        price,
        user,
        addressLTC,
        condition: 1,
    })

    await order.save()
    res.status(201).json({
        ok: true,
        msg: ['The order was purchased'],
    })
}
export const myEvaluationGetById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { user } = req

    const order = await Order.findOne({
        $and: [
            { _id: id },
            { user: user._id },
            { state: true },
            { condition: 1 },
        ],
    }).populate({ path: 'book', select: 'name evaluation' })

    if (!order) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: order,
    })
}
export const myEvaluationPatch = async (req: Request, res: Response) => {
    const { id } = req.params
    const { user } = req

    const order = await Order.findOneAndUpdate(
        {
            $and: [
                { _id: id },
                { user: user._id },
                { state: true },
                { condition: 1 },
            ],
        },
        {
            condition: 2,
        },
        { new: true }
    )

    if (!order) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: [],
        result: order,
    })
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

export const orderGetIncome = async (req: Request, res: Response) => {
    const totalIncome = await Order.aggregate([
        {
            $group: { _id: null, totalIncome: { $sum: '$price' } },
        },
    ])

    if (!totalIncome[0].totalIncome) {
        res.status(400).json({
            ok: true,
            msg: ['The order Income cannot be generated'],
        })
    }
    console.log()

    res.status(200).json({
        ok: true,
        msg: [],
        result: totalIncome[0].totalIncome,
    })
}
export const orderGetCount = async (req: Request, res: Response) => {
    const orders = await Order.count()

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

import { model, Schema, Document } from 'mongoose'


export interface IOrder extends Document {
    user: string
    book: string
    price: number
    condition: number
    dateCreated: Date
    addressLTC:string
    stripeId?:string

}

const orderSchema: Schema<IOrder> = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    condition: {
        type: Number,
        default: 0,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    addressLTC: {
        type: String,
        required: true,
    },
    stripeId:{
        type: String,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})
orderSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject()

    return resto
}



export const Order = model<IOrder>('Order', orderSchema)

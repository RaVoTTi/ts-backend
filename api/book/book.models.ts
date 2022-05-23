import { model, Schema, Document } from 'mongoose'

export interface IBook extends Document {
    name: string
    description: string
    richDescription: string
    state: boolean
    isFeatured: boolean
    image: string
    subject: string
    minPrice: number
    maxPrice: number
    rating: number
    dateCreated: Date
    numReviews: number
    autor: string
    evaluation?: string
    content?: string
}

const bookSchema: Schema<IBook> = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'The book is required'],
    },
    description: {
        type: String,
        required: [true, 'The description is required'],
    },
    richDescription: {
        type: String,
        required: [true, 'The description is required'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    isFeatured: {
        type: Boolean,
    },
    image: {
        type: String,
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },

    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    numReviews: {
        type: Number,
        default: 66,
    },
    minPrice: {
        type: Number,
        min: 0,
        required: true,
    },
    maxPrice: {
        type: Number,
        min: 0,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor',
    },
    evaluation: {
        type: String,
        // required: [true, 'The evaluation is required'],
    },
    content: {
        type: String,
    },
})

bookSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject()

    return resto
}

export const Book = model<IBook>('Book', bookSchema)

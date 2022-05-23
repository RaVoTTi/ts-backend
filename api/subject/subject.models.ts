import { model, Schema, Document } from 'mongoose'

export interface ISubject extends Document {
    name: string
    state: boolean
    color: string
    icon: string
    image: string
}

const subjectSchema:Schema<ISubject> = new Schema({
    name: {
        type: String,
        unique: true,
        uppercase: true,
        required: [true, 'El subject es obligatorio'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    color: {
        type: String,
        uppercase: true,
    },
    icon: {
        type: String,
    },
    image: {
        type: String,
    },
})

subjectSchema.methods.toJSON = function () {
    const { __v, _id, ...resto } = this.toObject()
    resto.id = _id

    return resto
}

export default model<ISubject>('Subject', subjectSchema)

import { model, Schema, Document } from 'mongoose'

export interface IAutor extends Document {
    name: string
    state: boolean
    urlWiki: string
}

const autorSchema: Schema<IAutor> = new Schema({
    name: {
        type: String,
        unique: true,
        uppercase: true,
        required: [true, 'El Autor es obligatorio'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    urlWiki: {
        type: String,
    },
})

autorSchema.methods.toJSON = function () {
    const { __v, _id, ...resto } = this.toObject()
    resto.id = _id

    return resto
}

export default model<IAutor>('Autor', autorSchema)

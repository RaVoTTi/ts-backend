import { model, Schema, Document, Model, Types, ObjectId } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    name: string

    lastName: string
    email: string
    password: string
    phone: number
    isAdmin: boolean
    state: boolean
    address?: IAddress
    // cryptoAddress?: ICryptoAddress
    dateCreated: Date



    comparePassword(candidatePassword: string): boolean
}
export interface IAddress extends Document {
    street: string
    apartament: string
    city: string
    zip: string
    country: string
}
// export interface ICryptoAddress extends Document {
//     cryptoType: string
//     wallet: string
// }

const addressSchema: Schema<IAddress> = new Schema(
    {
        street: {
            type: String,
        },
        apartament: {
            type: String,
        },
        city: {
            type: String,
        },
        zip: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    { _id: false }
)
// const cryptoAddressSchema: Schema<ICryptoAddress> = new Schema(
//     {
//         cryptoType: {
//             type: String,
//         },
//         wallet: {
//             type: String,
//         },

//     },
//     { _id: false }
// )


const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'name is required'],
    },
    lastName: {
        type: String,
        lowercase: true,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    address: {
        type: addressSchema,
    },
    // cryptoAddress: {
    //     type: cryptoAddressSchema,

    // },
    phone: {
        type: Number,
        required: [true, 'zip is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    state: {
        type: Boolean,
        default: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

userSchema.methods.comparePassword = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.toJSON = function (): IUser {
    const { __v, password, ...resto } = this.toObject()


    return resto
}

export const User = model<IUser>('User', userSchema)

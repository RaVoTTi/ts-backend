interface IPayment {
    price: number
    user: IUser
    payment_method: string
}

import Stripe from 'stripe'
import { IUser } from '../api/user/user.models'

const stripe = new Stripe(
    'sk_test_51JR3R0G7Fajw9ng5R116eg5hXQODqekmhH4X86CSrL4yepnyoUBhDQEGtg3Ne7jZzbZSIt5v9HUfVbVR3k6hwNZb00yDla2uPT',
    {
        apiVersion: '2020-08-27',
    }
)

export const generatePaymentMethod = async (token: string) => {
    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token },
    })
    return paymentMethod
}
export const generatePaymentIntent = async ({
    price,
    user,
    payment_method,
}: IPayment) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: process.env.STRIPE_CURRENCY ?? 'usd',
        payment_method_types: ['card'],
        payment_method,
        description: `${user.name} ${user.lastName} ${user._id} `,
    })

    return paymentIntent
}
export const getPaymentDetail = async (stripeId: string) =>{
    const detailOrder = await stripe.paymentIntents.retrieve(stripeId)
    return detailOrder

}

import jwt from 'jsonwebtoken'

export const generateJWT = (uid : string, isAdmin: boolean) =>{

    
    const payload = {
        uid,
        isAdmin
    } // genera un json

    return new Promise((resolve, reject) =>{
        
        const key = process.env.PRIVATE_KEY || ''
        if (key === '' ){
            reject("Private key isn't valid")
        }

        jwt.sign(payload, key, {
            expiresIn: '28d'
        }, (err: any, token: string | undefined)=>{
            if(err){
                reject("Token couldn't generate")
            }
            resolve(token?.toString())
        })
    })
}
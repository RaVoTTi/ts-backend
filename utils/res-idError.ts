import { Response } from 'express'

const resIdError = (res: Response) => {
    return res.status(400).json({
        ok: false,
        msg: ["This id doesn't exist"],
    })
}

export default resIdError

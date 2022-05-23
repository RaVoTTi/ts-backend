import { Response, Request, NextFunction } from 'express'

export const clearCamps = (reqs: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (let index = 0; index < reqs.length; index++) {
            delete req.body[reqs[index]]
        }
        next()
    }
}

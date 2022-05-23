// NODE
import path from "path"

// TERCEROS
import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
// import multer from 'multer'
import fileUpload from 'express-fileupload'

// DATABASE
import dbConnection from './database'

// HELPERS
// import { validateJwt } from '../helpers/validate-JWT'
// import { isAdminRole } from '../helpers/validate-admin-role'

// ROUTES
import { router as apiRoute } from '../api/api.routes'

export default class Server {
    private app: Express = express()
    public port: number = (process.env.PORT || 8080) as number
    public url: string = process.env.API_URL || '/api'

    constructor() {
        this.middlewares()
        this.routes()
        dbConnection()
    }
    // ROUTES
    routes() {
        this.app.use(this.url, apiRoute)
    }

    // MIDDLEWARES
    middlewares() {
        // CORS
        this.app.use(cors())
        // this.app.options('*', cors())

        // JSON
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        // HELMET
        this.app.use(
            helmet({
                crossOriginResourcePolicy: false, // UPGRADE
              })
        )
        

        // fileUpload
        this.app.use(
            fileUpload({
                useTempFiles: false,
                tempFileDir: 'public/uploads',
            })
        )

        // MORGAN
        this.app.use(morgan('dev'))

        // HTML
        this.app.use(express.static(`${process.env.PWD}/public`))
        this.app.use("/public/uploads", express.static(`${process.env.PWD}/public/uploads`)) 
            
    }

    // LISTEN
    listen() {
        this.app.listen(this.port, () => {
            console.log('App Listening in port:', this.port)
        })
    }
}

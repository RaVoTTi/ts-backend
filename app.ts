import dotenv from 'dotenv'
import Server from './config/server'

dotenv.config()
// export const rootPath: string = __dirname;
const server = new Server()
server.listen()

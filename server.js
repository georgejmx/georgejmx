import express from 'express'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'

const app = express()
const __filename = fileURLToPath(import.meta.url)
fileURLToPath(import.meta.url)
app.use(express.static(path.join(path.dirname(__filename), './frontend/dist')))

const server = new http.Server(app)
server.listen(3000, () => { console.log('server is up on local port 3000') })
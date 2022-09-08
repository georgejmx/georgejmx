import express, { Application } from 'express';
import path from 'path';
import http, { Server } from 'http';
import { fileURLToPath } from 'url';

const app: Application = express();
const __filename: string = fileURLToPath(import.meta.url);
app.use(express.static(path.join(path.dirname(__filename), './../frontend/dist')));

const server: Server = new http.Server(app);
server.listen(3000, () => { console.log('server is up on local port 3000') });
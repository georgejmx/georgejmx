import express, { Application, Request, Response } from 'express';
import path from 'path';
import http, { Server } from 'http';
import { fileURLToPath } from 'url';
import fData from './data/fascinations.json' assert {type: 'json'};

const app: Application = express();
const __filename: string = fileURLToPath(import.meta.url);
app.use(express.static(path.join(path.dirname(__filename), './../frontend/dist')));

type Fascination = {
    name: string,
    intensity: number,
    color: number,
    timestamp: number
}

// Choosing top 3 fascinations
function filterFascinations(input: Fascination[]): Fascination[] {
    return input.slice(0, 3);
}

// Getting fascinations
app.get('/fascinations', (req: Request, res: Response) => {
    const fsc: Fascination[] = fData.fascinations;
    res.send(filterFascinations(fsc));
})

const server: Server = new http.Server(app);
server.listen(3000, () => { console.log('server is up on local port 3000') });
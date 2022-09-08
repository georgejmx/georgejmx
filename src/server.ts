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
    timestamp: number,
    rating?: number
}

/* Function for calculating the rating multiplier for a fascination */
function findRating(f: Fascination): Fascination {
    const recency = 5*Math.floor((Date.now() - f.timestamp)/1000000);
    f.rating = 100000*f.intensity - recency;
    return f;
}

/* Choosing top 3 fascinations from the raw data, by calculating and sorting
 * by a ratings multiplier */
function rankFascinations(input: Fascination[]): Fascination[] {
    const output: Fascination[] = input.map(findRating);
    output.sort((a, b) => { return (b.rating || 0) - (a.rating || 0); });
    return output.slice(0, 3);
}

// Getting fascinations
app.get('/fascinations', (req: Request, res: Response) => {
    const fsc: Fascination[] = fData.fascinations;
    res.send(rankFascinations(fsc));
})

const server: Server = new http.Server(app);
server.listen(3000, () => { console.log('server is up on local port 3000') });
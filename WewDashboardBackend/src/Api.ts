import express, { Express, Request, Response } from 'express';
import { Agenda } from './models/Agenda';

export class API {

    port: number
    app: Express
    agendas = {} as Agenda[]

    constructor(port: number, agendas: Agenda[]) {
        this.port = port
        this.app = express();
        this.agendas = agendas
    }

    start() {
        this.app.get('/test', (req: Request, res: Response) => {
            res.send('Backend live !')
        })
          
        this.app.get('/calendar/current', async (req: Request, res: Response) => {
            res.send('calendar/current');
        });
    
        this.app.get('/calendar/three_days', async (req: Request, res: Response) => {
            res.send('calendar/three_days');
        });
          
        this.app.listen(this.port, () => {
            console.log(`Backend running at https://localhost:${this.port}`);
        });
    }
}

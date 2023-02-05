import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import { CalendarManager } from './CalendarManager';
import { Agenda } from './models/Agenda';
import { DebugManager } from './DebugManager';
import * as path from 'path';

export class API {

    port: number
    app: Express
    calendarManager = {} as CalendarManager
    debug: DebugManager

    constructor(port: number, calendarManager: CalendarManager) {
        this.port = port
        this.app = express()
        this.app.use(cors())
        this.app.use(express.static("./app"))
        this.app.get("/", function(req,res) {
            res.sendFile("index.html", { root: "./app"});
        });
        this.calendarManager = calendarManager
        this.debug = new DebugManager('ApiManager')
    }

    start() {
        this.app.get('/api/test', (req: Request, res: Response) => {
            res.send('Test is working')
        })

        this.app.get('/api', (req: Request, res: Response) => {
            res.send('WewDashboardBackend live !')
        })
          
        this.app.get('/api/calendar/day', async (req: Request, res: Response) => {
            const data = await this.calendarManager.getDayEvents()
            res.send(JSON.stringify(data));
        });
    
        this.app.get('/api/calendar/3days', async (req: Request, res: Response) => {
            const data = await this.calendarManager.get3daysEvents()
            res.send(JSON.stringify(data));
        });

        this.app.get('/api/calendar/tasks', async (req: Request, res: Response) => {
            const data = await this.calendarManager.getTodoTasks()
            res.send(JSON.stringify(data))
        })
          
        this.app.listen(this.port, () => {
            this.debug.log(`Backend running at https://localhost:${this.port}`);
        });
    }
}

import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { Agenda } from './models/Agenda';

export class AgendaManager {

    agendasPath: string

    constructor(agendasFolder: string) {
        this.agendasPath = path.resolve(__dirname, agendasFolder)
    }
    
    async loadAgendas(): Promise<Agenda[]> {
        var agendas: Agenda[] = []
        const calConfigs = await fsPromises.readdir(this.agendasPath)

        for (const configFile of calConfigs) {
            const content = JSON.parse(await fsPromises.readFile(`${this.agendasPath}/${configFile}`, 'utf8'))
            const agenda: Agenda = {name: content.name, icalUrl: content.url}
            agendas.push(agenda)
        }

        return agendas
    }

}

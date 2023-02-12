import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { Agenda } from './models/Agenda';
import { AgendaConfig } from './models/AgendaConfig';
import { DebugManager } from './DebugManager';

export class AgendaManager {

    agendasPath: string
    debug: DebugManager

    constructor(agendasFolder: string) {
        this.agendasPath = path.resolve(__dirname, agendasFolder)
        this.debug = new DebugManager('AgendaManager')
    }

    async loadAgendas(): Promise<Agenda[]> {
        this.debug.log('Loading agendas')

        var agendas: Agenda[] = []
        const calConfigs = await fsPromises.readdir(this.agendasPath)

        for (const configFile of calConfigs) {
            if (configFile.includes('cal')) {
                const content: AgendaConfig = JSON.parse(await fsPromises.readFile(`${this.agendasPath}/${configFile}`, 'utf8'))
                const agenda: Agenda = {name: content.name, icalUrl: content.icalUrl}
                agendas.push(agenda)
            }
        }
        this.debug.log(`Found ${agendas.length} agendas : \n${agendas.map((curr, ind) => {return (`-agenda n°${ind + 1} : ${curr.name}`)}).join('\n') } \n`)

        return agendas
    }

}

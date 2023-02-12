import { AgendaManager } from './AgendaManager';
import { API } from './ApiManager';
import { CalendarManager } from './CalendarManager';

async function init() {
  const agendaManager = new AgendaManager('config')
  const agendas = await agendaManager.loadAgendas()

  const calendarManager = new CalendarManager(agendas)

  const api = new API(3000, calendarManager)
  api.start()
}

init()
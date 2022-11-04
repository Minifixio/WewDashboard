import { AgendaManager } from './AgendaManager';
import { API } from './api';
import { CalendarManager } from './CalendarManager';

async function getCal(url: string) {

}

async function init() {
  const agendaManager = new AgendaManager('/agendas')
  const agendas = await agendaManager.loadAgendas()

  const calendarManager = new CalendarManager(agendas)

  const api = new API(3000, agendas)
  api.start()
}
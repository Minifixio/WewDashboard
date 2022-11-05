import ical from 'node-ical'
import { DebugManager } from './DebugManager';
import { Agenda } from './models/Agenda';
import { CalendarEvent } from './models/CalendarEvent';
import { DayEvents } from './models/DayEvents';


export class CalendarManager {
 
    agendas = {} as Agenda[]
    debug: DebugManager
    
    constructor(agendas: Agenda[]) {
        this.agendas = agendas
        this.debug = new DebugManager('CalendarManager')
    }

    async getCalendar(url: string): Promise<ical.CalendarResponse> {
        var res: ical.CalendarResponse = await ical.async.fromURL(url)
        return res
    }

    async get24hEvents(): Promise<CalendarEvent[]> {
        this.debug.log('Getting next 24h events...')

        const res: CalendarEvent[] = []
        for (const agenda of this.agendas) {
            const calendar = await this.getCalendar(agenda.icalUrl)
            const today = new Date()
            console.log(today, new Date(today.getTime() + 60 * 60 * 24 * 1000))
            const events = this.getEventsInRange(calendar, today, new Date(today.getTime() + 60 * 60 * 24 * 1000), agenda)
            res.concat(events)
        }

        this.debug.log(`Found ${res.length} events for the next 24 hours`)

        return res
    }

    async get3daysEvents(): Promise<DayEvents[]> {
        this.debug.log('Getting next 3 days events...')

        const res: DayEvents[] = []
        for (const agenda of this.agendas) {
            const calendar = await this.getCalendar(agenda.icalUrl)
            const today = new Date ((new Date()).setHours(0,0,0,0))

            const eventDay1 = await this.getEventsInRange(calendar, new Date((new Date()).setDate(today.getDate() + 1)), new Date((new Date()).setDate(today.getDate() + 2)), agenda)
            const eventDay2 = await this.getEventsInRange(calendar, new Date((new Date()).setDate(today.getDate() + 2)), new Date((new Date()).setDate(today.getDate() + 3)), agenda)
            const eventDay3 = await this.getEventsInRange(calendar, new Date((new Date()).setDate(today.getDate() + 3)), new Date((new Date()).setDate(today.getDate() + 4)), agenda)

            res.push(
                {
                    day: new Date((new Date()).setDate(today.getDate() + 1)),
                    events: eventDay1
                },
                {
                    day: new Date((new Date()).setDate(today.getDate() + 2)),
                    events: eventDay2
                },
                {
                    day: new Date((new Date()).setDate(today.getDate() + 3)),
                    events: eventDay3
                }
            )
        }

        this.debug.log(`Found ${res.length} events for the next 3 days`)

        return res
    }

    veventToCalEvent(vevent: ical.VEvent, agenda: Agenda): CalendarEvent {
        var calEvent = {} as CalendarEvent
        calEvent.title = vevent.summary
        calEvent.description = vevent.description
        calEvent.location = vevent.location
        calEvent.start = vevent.start
        calEvent.end = vevent.end
        calEvent.agenda = agenda
        return calEvent
    }
    
    getEventsInRange(calResponse: ical.CalendarResponse, start: Date, end: Date, agenda: Agenda): CalendarEvent[] {
        var res: CalendarEvent[] = []
    
        for (const key in calResponse) {
            const event: ical.CalendarComponent = calResponse[key]
            if (event.type == "VEVENT") {
                if (event.start.getTime() > start.getTime() && event.end.getTime() < end.getTime()) {
                    res.push(this.veventToCalEvent(event, agenda))
                }
            }
        }
    
        return res
    }
}


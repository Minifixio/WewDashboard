import ical from 'node-ical'
import { DebugManager } from './DebugManager';
import { Agenda } from './models/Agenda';
import { CalEvent } from './models/CalEvent';
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

    async getDayEvents(): Promise<CalEvent[]> {
        this.debug.log('Getting next 24h events...')

        var res: CalEvent[] = []

        for (const agenda of this.agendas) {
            const calendar = await this.getCalendar(agenda.icalUrl)
            const today = new Date()
            today.setHours(0,0,0,0)
            const events = this.getEventsInRange(calendar, today, new Date(today.getTime() + 60 * 60 * 24 * 1000), agenda)
            this.debug.log(`Found ${events.length} events for the next 24 hours for agenda ${agenda.name}`)
            res = res.concat(events)
        }

        this.debug.log(`Found ${res.length} events for the next 24 hours`)

        return res
    }

    async get3daysEvents(): Promise<DayEvents[]> {
        this.debug.log('Getting next 3 days events...')

        const res: DayEvents[] = []

        let day1Events: CalEvent[]= []
        let day2Events: CalEvent[]= []
        let day3Events: CalEvent[]= []
        const today = new Date ((new Date()).setHours(0,0,0,0))

        for (const agenda of this.agendas) {
            const calendar = await this.getCalendar(agenda.icalUrl)

            const eventDay1 = await this.getEventsInRange(calendar, new Date((new Date()).setDate(today.getDate() + 0)), new Date((new Date()).setDate(today.getDate() + 1)), agenda)
            const eventDay2 = await this.getEventsInRange(calendar, new Date((new Date()).setDate(today.getDate() + 1)), new Date((new Date()).setDate(today.getDate() + 2)), agenda)
            const eventDay3 = await this.getEventsInRange(calendar, new Date((new Date()).setDate(today.getDate() + 2)), new Date((new Date()).setDate(today.getDate() + 3)), agenda)
            day1Events = day1Events.concat(eventDay1)
            day2Events = day2Events.concat(eventDay2)
            day3Events = day3Events.concat(eventDay3)

        }

        res.push(
            {
                day: new Date((new Date()).setDate(today.getDate() + 1)),
                events: day1Events
            },
            {
                day: new Date((new Date()).setDate(today.getDate() + 2)),
                events: day2Events
            },
            {
                day: new Date((new Date()).setDate(today.getDate() + 3)),
                events: day3Events
            }
        )

        this.debug.log(`Found ${day1Events.length + day2Events.length + day3Events.length} events for the next 3 days`)

        return res
    }

    veventToCalEvent(vevent: ical.VEvent, agenda: Agenda): CalEvent {
        var calEvent = {} as CalEvent
        calEvent.title = vevent.summary
        calEvent.description = vevent.description
        calEvent.location = vevent.location
        calEvent.start = vevent.start
        calEvent.end = vevent.end
        calEvent.agenda = agenda
        return calEvent
    }
    
    getEventsInRange(calResponse: ical.CalendarResponse, start: Date, end: Date, agenda: Agenda): CalEvent[] {
        var res: CalEvent[] = []
    
        for (const key in calResponse) {
            const event: ical.CalendarComponent = calResponse[key]
            if (event.type == "VEVENT") {
                if (event.end.getTime() > start.getTime() && event.end.getTime() < end.getTime()) {
                    res.push(this.veventToCalEvent(event, agenda))
                }
            }
        }
        
        return res
    }
}


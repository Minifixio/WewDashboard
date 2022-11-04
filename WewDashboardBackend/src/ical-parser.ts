import ical from 'node-ical'
import { Agenda } from './models/Agenda';
import { CalEvent } from './models/CalEvent';

function  veventToCalEvent(vevent: ical.VEvent, agenda: Agenda): CalEvent {
    var calEvent = {} as CalEvent
    calEvent.title = vevent.summary
    calEvent.description = vevent.description
    calEvent.location = vevent.location
    calEvent.start = vevent.start
    calEvent.end = vevent.end
    calEvent.agenda = agenda
    return calEvent
}

function getEventsInRange(calResponse: ical.CalendarResponse, start: Date, end: Date, agenda: Agenda): CalEvent[] {
    var res: CalEvent[] = []

    for (const key in calResponse) {
        const event: ical.CalendarComponent = calResponse[key]
        if (event.type == "VEVENT") {
            if (event.start.getTime() > start.getTime() && event.end.getTime() < end.getTime()) {
                res.push(veventToCalEvent(event, agenda))
            }
        }
    }

    return res
}

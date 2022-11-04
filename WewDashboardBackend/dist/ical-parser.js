"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function veventToCalEvent(vevent, agenda) {
    var calEvent = {};
    calEvent.title = vevent.summary;
    calEvent.description = vevent.description;
    calEvent.location = vevent.location;
    calEvent.start = vevent.start;
    calEvent.end = vevent.end;
    calEvent.agenda = agenda;
    return calEvent;
}
function getEventsInRange(calResponse, start, end) {
    var res = [];
    for (const key in calResponse) {
        const event = calResponse[key];
        if (event.type == "VEVENT") {
            if (event.start.getTime() > start.getTime() && event.end.getTime() < end.getTime()) {
                res.push(event);
            }
        }
    }
    return res;
}

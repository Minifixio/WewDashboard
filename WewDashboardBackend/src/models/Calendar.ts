import { Agenda } from "./Agenda";
import { CalendarEvent } from "./CalEvent";

export interface Calendar {
    agenda: Agenda
    events: CalendarEvent[]
}
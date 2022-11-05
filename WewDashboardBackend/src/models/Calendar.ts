import { Agenda } from "./Agenda";
import { CalendarEvent } from "./CalendarEvent";

export interface Calendar {
    agenda: Agenda
    events: CalendarEvent[]
}
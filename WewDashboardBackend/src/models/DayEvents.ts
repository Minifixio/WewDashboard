import { CalendarEvent } from "./CalendarEvent"

export interface DayEvents {
    day: Date
    events: CalendarEvent[]
}
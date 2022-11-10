import { CalendarEvent } from "./CalEvent"

export interface DayEvents {
    day: Date
    events: CalendarEvent[]
}
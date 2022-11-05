import { Agenda } from "./Agenda"

export interface CalendarEvent {
    start: Date
    end: Date
    location: string
    title: string
    description: string
    agenda: Agenda
}
import { Agenda } from "./Agenda"

export interface CalEvent {
    start: Date
    end: Date
    location: string
    title: string
    description: string
    agenda: Agenda
}
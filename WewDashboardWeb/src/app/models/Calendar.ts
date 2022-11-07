export interface Agenda {
    name: string
    icalUrl: string
}

export interface Calendar {
    agenda: Agenda
    events: CalendarEvent[]
}

export interface CalendarEvent {
    start: Date
    end: Date
    location: string
    title: string
    description: string
    agenda: Agenda
}

export interface DayEvents {
    day: Date
    events: CalendarEvent[]
}
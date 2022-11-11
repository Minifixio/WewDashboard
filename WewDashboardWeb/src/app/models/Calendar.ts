export interface Agenda {
    name: string
    icalUrl: string
}

export interface Calendar {
    agenda: Agenda
    events: CalEvent[]
}

export interface CalEvent {
    // Date as string format : 2022-11-11T05:00:00.000Z
    start: string
    end: string 
    location: string
    title: string
    description: string
    agenda: Agenda
}

export interface DayEvents {
    // Date as string format : 2022-11-11T05:00:00.000Z
    day: string
    events: CalEvent[]
}
import { Agenda } from "./Agenda"

export interface TodoTask {
    date: Date
    title: string
    agenda: Agenda
}
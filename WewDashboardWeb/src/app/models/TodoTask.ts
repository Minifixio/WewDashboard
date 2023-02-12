import { Agenda } from "./Calendar"

export interface TodoTask {
    date: string
    title: string
    agenda: Agenda
}
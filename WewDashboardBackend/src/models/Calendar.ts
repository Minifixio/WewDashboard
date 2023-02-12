import { Agenda } from "./Agenda";
import { CalEvent } from "./CalEvent";

export interface Calendar {
    agenda: Agenda
    events: CalEvent[]
}
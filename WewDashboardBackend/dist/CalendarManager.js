"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarManager = void 0;
const node_ical_1 = __importDefault(require("node-ical"));
const DebugManager_1 = require("./DebugManager");
class CalendarManager {
    constructor(agendas) {
        this.agendas = {};
        this.agendas = agendas;
        this.debug = new DebugManager_1.DebugManager('CalendarManager');
    }
    getCalendar(url) {
        return __awaiter(this, void 0, void 0, function* () {
            var res = yield node_ical_1.default.async.fromURL(url);
            return res;
        });
    }
    get24hEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug.log('Getting next 24h events...');
            var res = [];
            for (const agenda of this.agendas) {
                const calendar = yield this.getCalendar(agenda.icalUrl);
                const today = new Date();
                const events = this.getEventsInRange(calendar, today, new Date(today.getTime() + 60 * 60 * 24 * 1000), agenda);
                this.debug.log(`Found ${events.length} events for the next 24 hours for agenda ${agenda.name}`);
                res = res.concat(events);
            }
            this.debug.log(`Found ${res.length} events for the next 24 hours`);
            return res;
        });
    }
    get3daysEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug.log('Getting next 3 days events...');
            const res = [];
            for (const agenda of this.agendas) {
                const calendar = yield this.getCalendar(agenda.icalUrl);
                const today = new Date((new Date()).setHours(0, 0, 0, 0));
                const eventDay1 = yield this.getEventsInRange(calendar, new Date((new Date()).setDate(today.getDate() + 1)), new Date((new Date()).setDate(today.getDate() + 2)), agenda);
                const eventDay2 = yield this.getEventsInRange(calendar, new Date((new Date()).setDate(today.getDate() + 2)), new Date((new Date()).setDate(today.getDate() + 3)), agenda);
                const eventDay3 = yield this.getEventsInRange(calendar, new Date((new Date()).setDate(today.getDate() + 3)), new Date((new Date()).setDate(today.getDate() + 4)), agenda);
                res.push({
                    day: new Date((new Date()).setDate(today.getDate() + 1)),
                    events: eventDay1
                }, {
                    day: new Date((new Date()).setDate(today.getDate() + 2)),
                    events: eventDay2
                }, {
                    day: new Date((new Date()).setDate(today.getDate() + 3)),
                    events: eventDay3
                });
            }
            this.debug.log(`Found ${res.length} events for the next 3 days`);
            return res;
        });
    }
    veventToCalEvent(vevent, agenda) {
        var calEvent = {};
        calEvent.title = vevent.summary;
        calEvent.description = vevent.description;
        calEvent.location = vevent.location;
        calEvent.start = vevent.start;
        calEvent.end = vevent.end;
        calEvent.agenda = agenda;
        return calEvent;
    }
    getEventsInRange(calResponse, start, end, agenda) {
        var res = [];
        for (const key in calResponse) {
            const event = calResponse[key];
            if (event.type == "VEVENT") {
                if (event.start.getTime() > start.getTime() && event.end.getTime() < end.getTime()) {
                    res.push(this.veventToCalEvent(event, agenda));
                }
            }
        }
        console.log(res.length);
        return res;
    }
}
exports.CalendarManager = CalendarManager;

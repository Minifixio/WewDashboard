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
const agendasConfig = require('./config/agendas-config.json');
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
    getDayEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug.log('Getting next 24h events...');
            var res = [];
            for (const agenda of this.agendas) {
                const calendar = yield this.getCalendar(agenda.icalUrl);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
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
            let day1Events = [];
            let day2Events = [];
            let day3Events = [];
            const today = new Date((new Date()).setHours(0, 0, 0, 0));
            for (const agenda of this.agendas) {
                const calendar = yield this.getCalendar(agenda.icalUrl);
                const eventDay1 = yield this.getEventsInRange(calendar, new Date(new Date(new Date().setDate(today.getDate() + 1)).setHours(0, 0, 0, 0)), new Date(new Date(new Date().setDate(today.getDate() + 2)).setHours(0, 0, 0, 0)), agenda);
                const eventDay2 = yield this.getEventsInRange(calendar, new Date(new Date(new Date().setDate(today.getDate() + 2)).setHours(0, 0, 0, 0)), new Date(new Date(new Date().setDate(today.getDate() + 3)).setHours(0, 0, 0, 0)), agenda);
                const eventDay3 = yield this.getEventsInRange(calendar, new Date(new Date(new Date().setDate(today.getDate() + 3)).setHours(0, 0, 0, 0)), new Date(new Date(new Date().setDate(today.getDate() + 4)).setHours(0, 0, 0, 0)), agenda);
                day1Events = day1Events.concat(eventDay1);
                day2Events = day2Events.concat(eventDay2);
                day3Events = day3Events.concat(eventDay3);
            }
            res.push({
                day: new Date((new Date()).setDate(today.getDate() + 1)),
                events: day1Events
            }, {
                day: new Date((new Date()).setDate(today.getDate() + 2)),
                events: day2Events
            }, {
                day: new Date((new Date()).setDate(today.getDate() + 3)),
                events: day3Events
            });
            this.debug.log(`Found ${day1Events.length + day2Events.length + day3Events.length} events for the next 3 days`);
            this.debug.log(`Events count : ${day1Events.length} for day1, ${day2Events.length}for day2, ${day3Events.length} for day3`);
            return res;
        });
    }
    getTodoTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug.log('Getting Todo tasks...');
            var res = [];
            for (const agenda of this.agendas) {
                const calendar = yield this.getCalendar(agenda.icalUrl);
                const tasks = this.getTodoEvents(calendar, agenda);
                this.debug.log(`Found ${tasks.length} tasks for agenda ${agenda.name}`);
                res = res.concat(tasks);
            }
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
    veventToTodoTask(vevent, agenda) {
        var todoTask = {};
        todoTask.agenda = agenda;
        todoTask.date = vevent.start;
        todoTask.title = vevent.summary.replace(agendasConfig.tasks_word, "");
        return todoTask;
    }
    getTodoEvents(calResponse, agenda) {
        var res = [];
        for (const key in calResponse) {
            const event = calResponse[key];
            if (event.type == "VEVENT" && event.summary.includes(agendasConfig.tasks_word) && event.start.getTime() >= new Date().getTime()) {
                res.push(this.veventToTodoTask(event, agenda));
            }
        }
        res.sort((a, b) => { return a.date.getTime() - b.date.getTime(); });
        return res;
    }
    getEventsInRange(calResponse, start, end, agenda) {
        var res = [];
        for (const key in calResponse) {
            const event = calResponse[key];
            if (event.type == "VEVENT") {
                if (event.start.getTime() > start.getTime() && event.start.getTime() < end.getTime()) {
                    res.push(this.veventToCalEvent(event, agenda));
                }
            }
        }
        return res;
    }
}
exports.CalendarManager = CalendarManager;

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
Object.defineProperty(exports, "__esModule", { value: true });
const AgendaManager_1 = require("./AgendaManager");
const ApiManager_1 = require("./ApiManager");
const CalendarManager_1 = require("./CalendarManager");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const agendaManager = new AgendaManager_1.AgendaManager('agendas');
        const agendas = yield agendaManager.loadAgendas();
        const calendarManager = new CalendarManager_1.CalendarManager(agendas);
        const api = new ApiManager_1.API(3000, calendarManager);
        api.start();
    });
}
init();

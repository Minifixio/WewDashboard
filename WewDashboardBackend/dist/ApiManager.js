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
exports.API = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const DebugManager_1 = require("./DebugManager");
class API {
    constructor(port, calendarManager) {
        this.calendarManager = {};
        this.port = port;
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static("./app"));
        this.app.get("/", function (req, res) {
            res.sendFile("index.html", { root: "./app" });
        });
        this.calendarManager = calendarManager;
        this.debug = new DebugManager_1.DebugManager('ApiManager');
    }
    start() {
        this.app.get('/api/test', (req, res) => {
            res.send('Test is working');
        });
        this.app.get('/api', (req, res) => {
            res.send('WewDashboardBackend live !');
        });
        this.app.get('/api/calendar/day', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.calendarManager.getDayEvents();
            res.send(JSON.stringify(data));
        }));
        this.app.get('/api/calendar/3days', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.calendarManager.get3daysEvents();
            res.send(JSON.stringify(data));
        }));
        this.app.get('/api/calendar/tasks', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.calendarManager.getTodoTasks();
            res.send(JSON.stringify(data));
        }));
        this.app.listen(this.port, () => {
            this.debug.log(`Backend running at https://localhost:${this.port}`);
        });
    }
}
exports.API = API;

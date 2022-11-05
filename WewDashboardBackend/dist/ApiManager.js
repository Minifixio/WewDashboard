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
const DebugManager_1 = require("./DebugManager");
class API {
    constructor(port, calendarManager) {
        this.calendarManager = {};
        this.port = port;
        this.app = (0, express_1.default)();
        this.calendarManager = calendarManager;
        this.debug = new DebugManager_1.DebugManager('ApiManager');
    }
    start() {
        this.app.get('/test', (req, res) => {
            res.send('Backend live !');
        });
        this.app.get('/calendar/24hours', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.calendarManager.get24hEvents();
            res.send(JSON.stringify(data));
        }));
        this.app.get('/calendar/3days', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.calendarManager.get3daysEvents();
            res.send(JSON.stringify(data));
        }));
        this.app.listen(this.port, () => {
            this.debug.log(`Backend running at https://localhost:${this.port}`);
        });
    }
}
exports.API = API;

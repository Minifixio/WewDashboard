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
const express_1 = __importDefault(require("express"));
const node_ical_1 = __importDefault(require("node-ical"));
const app = (0, express_1.default)();
const port = 3000;
//const url = "https://calendar.google.com/calendar/ical/emile%40le-gallic.com/private-cf11f80652b038b843c55bab69dad969/basic.ics"
const url = "https://synapses.telecom-paris.fr/calendar/ical/9a6a16cbf76e8440184280037b9eeef2eed8dfdc6ee9769d95e0d046b42fd829";
function getCal(url) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = yield node_ical_1.default.async.fromURL(url);
        return res;
    });
}
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cal = yield getCal(url);
    res.send(cal);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
node_ical_1.default.fromURL(url, {}, function (error, data) {
    console.log(data);
});

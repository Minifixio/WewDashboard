"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugManager = void 0;
class DebugManager {
    constructor(serviceName) {
        this.serviceName = serviceName;
    }
    log(message) {
        console.log(`[${this.serviceName}] ~ ${message}`);
    }
}
exports.DebugManager = DebugManager;

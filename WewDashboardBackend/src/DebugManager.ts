export class DebugManager {
    
    serviceName: string

    constructor(serviceName: string) {
        this.serviceName = serviceName
    }

    log(message: string) {
        console.log(`[${this.serviceName}] ~ ${message}`)
    }
}
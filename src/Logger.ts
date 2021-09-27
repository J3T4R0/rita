export default interface Logger {
    log(data: any): void;
    warn(data: any): void;
    error(data: any): void;
    critical(data: any): void;
}

export class DefaultConsoleLogger implements Logger {
    critical(data: any): void {
        this.error(data)
    }

    error(data: any): void {
        console.error(data)
    }

    log(data: any): void {
        console.log(data);
    }

    warn(data: any): void {
        console.warn(data);
    }

}

export let logger: Logger = new DefaultConsoleLogger();

export function setLogger(logInstance: Logger) {
    logger = logInstance;
}

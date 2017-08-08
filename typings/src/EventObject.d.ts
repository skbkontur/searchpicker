export declare class EventObject {
    private events;
    $notifyEvent(eventName: string, ...args: any[]): void;
    on(eventName: string, cb: Function): void;
}

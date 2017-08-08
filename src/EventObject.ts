export class EventObject {
    private events: any = {};

    public $notifyEvent(eventName: string, ...args) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                this.events[eventName][i].apply(this, args);
            }
        }
    }

    on(eventName: string, cb: Function) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(cb);
    }
}

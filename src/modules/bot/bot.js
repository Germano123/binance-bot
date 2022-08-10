class Bot {
    constructor(id, interval) {
        this.id = id;
        this.interval = interval;
        this.running = null;
    }
    
    start() {
        this.running = setInterval(async() => {
            console.log(`Bot ${this.id} is running.`);
        }, this.interval);
    }
    
    shutDown() {
        clearInterval(this.running);
    }
}

exports.default = Bot;
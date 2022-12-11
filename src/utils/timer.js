class Timer {
    constructor() {
        this.times = null
        this.start()
    }

    get currentTime() {
        return new Date().getTime()
    }

    get initTime() {
        return this.times[0]
    }

    get previousTime() {
        return this.times[this.times.length - 2]
    }

    get endTime() {
        return this.times[this.times.length - 1]
    }


    start() {
        this.times = [this.currentTime]
    }

    register() {
        this.times.push(this.currentTime)
    }


    log(message) {
        const timeDiff = this.endTime - this.previousTime
        logTime(message, timeDiff)
    }

    logTotal(message) {
        const timeDiff = this.endTime - this.initTime
        logTime(message, timeDiff)
    }

    
    registerAndLog(message) {
        this.register()
        this.log(message)
    }

    registerAndLogTotal(message) {
        this.register()
        this.logTotal(message)
    }
}

function logTime(message, timeMilliseconds) {
    console.log(message, {
        ms: timeMilliseconds,
        s: timeMilliseconds / 1000,
        min: timeMilliseconds / 1000 / 60
    }) 
}

module.exports = Timer
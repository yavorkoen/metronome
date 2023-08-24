function Timer(callback, timeInterval, options) {
    this.timeInterval = timeInterval;
    //start timer
    this.start = () => {
        this.expected = Date.now() + this.timeInterval;
        this.theTimeout = null;

        if(options.immediate) {
            callback();
        }

        this.timeout = setTimeout(this.round, this.timeInterval);
        console.log('Started!');
    }
    //stop timer
    this.stop = () => {

        clearTimeout(this.timeout);
        console.log('Stopped!');

    }
    //Method for adjusting time interval
    this.round = () => {
        let drift = Date.now() - this.expected;
        // Check if drift is greater than time interval and run err callback if true
        if(drift > this.timeInterval) {
            if(options.errorCallback) {
                options.errorCallback();
            } 
        }
        callback();
        this.expected += this.timeInterval;
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
}

export default Timer;


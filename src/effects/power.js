class Power {
    constructor(tactPlay, options, otherOptions) {
        this.tactPlay = tactPlay
        this.options = options
    }

    handle(gameData) {
        if(gameData.triggerLeft >= 1) {
            this.tactPlay('powerLeftHand', this.options)
        } else if (gameData.triggerRight >= 1) {
            this.tactPlay('powerRightHand', this.options)
        }
    }
}

module.exports = Power

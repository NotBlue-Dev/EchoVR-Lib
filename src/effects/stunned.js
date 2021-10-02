class Stunned {
    constructor(tactPlay, options, otherOptions) {
        this.tactPlay = tactPlay
        this.options = options
        this.otherOptions = otherOptions
        this.stunned = false
    }

    handle(gameData) {
        const player = gameData.player
        if (player.stunned === true && this.stunned === false) {
            this.stunned = true;
            this.tactPlay('stunned', this.options)
            if(this.otherOptions[0].enable) this.tactPlay('stunnedHead', this.otherOptions[0]);
            setTimeout(() => {
                this.stunned = false;
            }, 3000);
        }
    }
}

module.exports = Stunned

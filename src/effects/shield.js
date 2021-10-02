class Shield {
    constructor(tactPlay, options, otherOptions) {
        this.tactPlay = tactPlay
        this.options = options
        this.otherOptions = otherOptions
        this.block = false
    }

    handle(gameData) {
        if (gameData.player.blocking === true && this.block === false) {
            this.block = true;

            this.tactPlay('shield', this.options)
            
            if(this.otherOptions[0].enable) this.tactPlay('shieldHand', this.otherOptions[0])

            if(this.otherOptions[1].enable) this.tactPlay('shieldHead', this.otherOptions[1])
            
            setTimeout(() => {
                this.block = false;
            }, 400);
        }
    }
}

module.exports = Shield

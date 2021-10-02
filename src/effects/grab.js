class Grab {
    constructor(tactPlay, options, otherOptions) {
        this.tactPlay = tactPlay
        this.otherOptions = otherOptions
        this.options = options
        this.grabbed = false
    }

    handle(gameData) {
        let hand = gameData.isPlayerGrabbingPlusHand()

        if(hand !== undefined && this.grabbed != true) {
            if(this.otherOptions[0].enable) this.tactPlay(`grab${hand}Hand`, this.otherOptions[0])
            this.grabbed = true
        }

        if(hand == false) this.grabbed = false


        if (false === gameData.isPlaying()) {
            return
        }

        const orangePlayers = gameData.orangeTeamPlayers;

        for (let i in orangePlayers) {
            if (gameData.isPlayerGrabbedBy(orangePlayers[i])) {
                this.tactPlay('grab', this.options);
            }
        }

        const bluePlayers = gameData.blueTeamPlayers;
        
        for (let i in bluePlayers) {
            if (gameData.isPlayerGrabbedBy(bluePlayers[i])) {
                this.tactPlay('grab', this.options);
            }
        }

    }
}

module.exports = Grab

class Stun {
    constructor(tactPlay, options, otherOptions) {
        this.tactPlay = tactPlay
        this.options = options
        this.otherOptions = otherOptions
        this.stun = false
    }

    handle(gameData) {
        if (this.stun) {
            return
        }

        const playerPos = gameData.player.head.position;

        (gameData.enemyTeamPlayers || []).forEach((enemyPlayer) => {
            if(enemyPlayer === undefined) {
                return
            }

            const enemyPos = enemyPlayer.head.position
            if (enemyPlayer.stunned && this.isInCube(playerPos, enemyPos, 1) && this.triggered(gameData)) {
                this.stun = true;
                this.tactPlay('stun', this.options);

                if(this.otherOptions[0].enable) {
                    if(gameData.triggerLeft >= 1) {
                        this.tactPlay('stunLeftHand', this.otherOptions[0])
                    } else if(gameData.triggerRight >= 1) {
                        this.tactPlay('stunRightHand', this.otherOptions[0])
                    }
                }
                
                setTimeout(() => {
                    this.stun = false;
                }, 1000);
            }
        })
    }

    triggered(gameData) {
        return gameData.triggerLeft >= 1 || gameData.triggerRight >= 1
    }

    isInCube(position1, position2, size) {
        return (position1[0] >= position2[0] - size && position1[0] <= position2[0] + size)
            && (position1[1] >= position2[1] - size && position1[1] <= position2[1] + size)
            && (position1[2] >= position2[2] - size && position1[2] <= position2[2] + size)
    }
}

module.exports = Stun

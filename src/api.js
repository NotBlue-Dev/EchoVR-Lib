const fetch = require('node-fetch');
const Heart = require("./effects/heart");
const Stunned = require("./effects/stunned");
const Grab = require("./effects/grab");
const Goal = require("./effects/goal");
const Shield = require("./effects/shield");
const Stun = require("./effects/stun");
const GameData = require("./gameData");
const Wall = require("./effects/wall");
const Boost = require("./effects/boost");
const Power = require("./effects/power");

class Api {
    constructor(tactPlay, config) {
        this.tactPlay = tactPlay
        this.config = config
        this.state = true
        this.effects = []
        this.initializeEffects()
    }

    initializeEffects() {
        this.effects = []
        const effectClass = {
            heart: Heart,
            stunned: Stunned,
            grab: Grab,
            goal: Goal,
            shield: Shield,
            stun: Stun,
            boost: Boost,
            wall: Wall,
            powerHand: Power,
        }

        const otherClass = {
            heart: undefined,
            stunned: [this.config.effects.other.stunnedHead],
            grab: [this.config.effects.other.grabHand],
            goal: undefined,
            shield: [this.config.effects.other.shieldHand,this.config.effects.other.shieldHead],
            stun: [this.config.effects.other.stunHand],
            boost: undefined,
            wall: [this.config.effects.other.wallHead],
        }

        for (const [name, effect] of Object.entries(this.config.effects.global)) {
            effect.enable && this.effects.push(
                new (effectClass[name])
                (this.tactPlay, {
                intensity: effect.intensity,
                duration: effect.duration
                }, otherClass[name])
            )

        }
    }

    setEffectsSetting(settings) {
        this.config.effects = settings
        this.initializeEffects()
    }

    setEffectSetting(name, options, other) {
        if(!other) {
            this.config.effects.global[name] = {
                ...this.config.effects.global[name],
                ...options
            }
    
            this.initializeEffects()
        } else {
            this.config.effects.other[name] = {
                ...this.config.effects.other[name],
                ...options
            }
        }
    }

    setPlayerIp(ip) {
        this.playerIp = ip
    }

    playId() {
        fetch(`http://${this.playerIp}:6721/session`).then(resp => resp.json()).then(json => {
            const gameData = new GameData(json)
            this.playerTeamLength = gameData.playerTeamLength
            
        })
    }

    request() {
        fetch(`http://${this.playerIp}:6721/session`).then(resp => resp.json()).then(json => {
            const gameData = new GameData(json)
            
            if (!gameData.isInMatch() || this.state === false) {
                throw new Error('Not ready');
            }   

            if (this.playerTeamLength !== gameData.playerTeamLength) {
                this.playId()
            }

            this.effects.forEach((effect) => {
                effect.handle(gameData)
            })

            this.request()
        }).catch(error => {
            if (error.response) {
                if (error.response.status === 404) {
                    console.log('in Menu/Loading or invalid IP')
                } else {
                    console.log(error.response.status)
                }
            } else if (error.request) {
                console.log('Connection refused, game running ?');
            } else {
                console.log('Error', error);
            }
    
            //auto restart after 5s
            setTimeout(() => {
                this.playId()
                this.request()
            }, 5000);
        })
    }
}

module.exports = Api

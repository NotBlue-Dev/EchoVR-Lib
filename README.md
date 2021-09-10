# Echo VR Bhaptic Mod Library
 This is a library based on event emiter/receiver that you can use to sync echo arena with bhaptics products

## Requirements

- ws
- node-fetch

## Supported Platforms

- Windows
- Linux (with a mock of ipfinder)

## Install

```
npm i --save echomodlib
```

## Methods

**TactPlayer(tact, ipFinder, configLoader, sendEvent, listenEvent)**
Init the module, you can use custom mock. Check structure here: (https://github.com/NotBlue-Dev/EchoVR-Lib/tree/main/src).
This is a basic code to init and start the backend (this should be in your main.js/app.js)

**Arguments**

- `tact` - `Module`

TactJs Adapter (Connection side)

- `ipFinder` - `Module`

Ip finder for the quest (resolve promise)

- `configLoader` - `Module`

Loader for default and config.json

- `sendEvent` - `Function`

your event emitter function with (channel,args) as options

- `listenEvent` - `Module`

your event listener function with (channel,args) as options

**Important**
To start checking for bhaptic players after your TactPlayer is defined `YourTactPlayer.launch()` 

**Examples**

```js
const EchoLib = require('echomodlib')
const events = require('events');
const eventEmitter = new events.EventEmitter();

const sendEvent = (channel, args) => {
    eventEmitter.emit(channel, args);
}

const listenEvent = (channel, callable) => {
    eventEmitter.on(channel, callable);
}

const player = new EchoLib.TactPlayer(
    new EchoLib.BHapticsTactJsAdapter(),
    new EchoLib.IpFinder(),
    new EchoLib.ConfigLoader(__dirname),
    sendEvent,
    listenEvent
)

player.launch()

```

## Events Listener

Here are all the events you can listen on

**tact-device-fileLoaded**
When all the .tact files are loaded this event is triggered

**Arguments**
- `none`

**Examples**
```js
eventEmitter.on('tact-device-fileLoaded',  () => {
    //Your code
});
```

**tact-device-connecting**
On connecting to the bhaptics player

**Arguments**
- `none`

**Examples**
```js
eventEmitter.on('tact-device-connecting',  () => {
    //Your code
});
```

**tact-device-connected**
When the lib is connected to bhaptics player

**Arguments**
- `none`

**Examples**
```js
eventEmitter.on('tact-device-connected',  () => {
    //Your code
});
```

**tact-device-disconnected**
When the lib is disconnected from bhaptics player

**Arguments**
- `message`

**Examples**
```js
eventEmitter.on('tact-device-disconnected',  (args) => {
    //Your code
});
```

**game-ip-defined**
When the ip is found (manual or scanning)

**Arguments**
- `definedIp`

The ip defined

**Examples**
```js
eventEmitter.on('game-ip-defined',  (args) => {
    //Your code
});
```

**game-ip-bad-defined**
When the ip is not found or invalid

**Arguments**
- `definedIp`

The ip defined

**Examples**
```js
eventEmitter.on('game-ip-bad-defined',  (args) => {
    //Your code
});
```

**config-save-failed**
When config saving fail

**Arguments**
- `none`

**Examples**
```js
eventEmitter.on('config-save-failed',  () => {
    //Your code
});
```

**config-save-success**
When config saving succed

**Arguments**
- `none`

**Examples**
```js
eventEmitter.on('config-save-success',  () => {
    //Your code
});
```

**find-ip-canceled**
When ip finder is canceled by user

**Arguments**
- `none`

**Examples**
```js
eventEmitter.on('find-ip-canceled',  () => {
    //Your code
});
```

**find-ip-timeout**
When ip finder is resolve promise with timeout (no ip found)

**Arguments**
- `none`

**Examples**
```js
eventEmitter.on('find-ip-timeout',  () => {
    //Your code
});
```

**find-ip-failed**
When ip finder can't find ip

**Arguments**
- `err`

Error returned

**Examples**
```js
eventEmitter.on('find-ip-failed',  (args) => {
    //Your code
});
```

**settings-updated**
Update of intensity or if disable/enable (Triggered by event emiter get-settings)

**Arguments**
- `effects`

Return an object of effects (intensity and status)

**Examples**
```js
eventEmitter.on('settings-updated',  (args) => {
    //Your code
});
```

**data-updated**
Triggered by event emiter get-data

**Arguments**
- `statusIp`

Return IP
- `statusIpValid`

Return if the ip is valid (false if not)
- `statusHaptic`

State of bhaptics player
- `logs`

return array with all logs

**Examples**
```js
eventEmitter.on('data-updated',  (args) => {
    //Your code
});
```

## Events Emiter

Here are all the events you can trigger

**find-ip**
Scan for ip and return event if error is triggered, else it define game ip

**Arguments**
- `device`

Device type `Quest` or `PC` 

**Examples**
```js
eventEmitter.emit('find-ip', "Quest")
```

**define-ip**
Manually define ip (automatically triggered if ip is found by find-ip)

**Arguments**
- `ip`

Ip you want to set

**Examples**
```js
eventEmitter.emit('define-ip', "192.168.1.53")
```

**save-config**
Write Data to config file (config failed/success will automatically be emit after)

**Arguments**
- `none`

**Examples**
```js
eventEmitter.emit('save-config', () => {
    //Your code
})
```

**change-setting**
It need to be call on each settings change like status or intensity, this will set effect settings to api.js

**Arguments**
- `effect`

Name of your effect

- `status`

it will enable or disable the effect (enable or disable)

**Examples**
```js
eventEmitter.emit('change-setting', {
        effect: names,
        status,
    })
```

**play-effect**
Play effect on bhaptics products

**Arguments**
- `effect`

Name of the effect you want to play

**Examples**
```js
eventEmitter.emit('play-effect', {
        effect: names,
    })
```

**default-settings**
Reset settings by default (config.json content will be replaced by default.json content)

**Arguments**
- `none`

Name of the effect you want to play

**Examples**
```js
eventEmitter.emit('default-settings', () => {
    //Your code
})
```

**get-settings**
This will update the config object for api.js

**Arguments**
- `none`

**Examples**
```js
eventEmitter.emit('get-settings', () => {
    //Your code
})
```

**get-data**
This will update objects for api.js, (StatusIP, Is ip valid, status of bhaptic player, logs array)
Required when you load your renderer (For example if you go from settings to your main, get-data need to be emit by your main)

**Arguments**
- `none`

**Examples**
```js
eventEmitter.emit('get-data', () => {
    //Your code
})
```

**log**
If you want to make a box with logs, you need to send log through this event (so the backend save them in an array)

**Arguments**
- `loggingMessage`

A string of the message you want to log

**Examples**
```js
eventEmitter.emit('log', loggingMessage)
```

**startRequest**
The request is automatically started when ip is found and bhaptic player is running, but you can run it manually with this event

**Arguments**
- `none`

**Examples**
```js
eventEmitter.emit('startRequest', () => {
    //Your code
})
```

**stopRequest**
You can "stop" request (this will just stop interaction and effects)

**Arguments**
- `none`

**Examples**
```js
eventEmitter.emit('stopRequest', () => {
    //Your code
})
```

## License

MIT

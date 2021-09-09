
const TactPlayer = require('./src/tactPlayer')
const IpFinder = require('./src/ipFinder')
const ConfigLoader = require('./src/configLoader')
const BHapticsTactJsAdapter = require('./src/tact/bHapticsTactJsAdapter')

module.exports = {
    TactPlayer: TactPlayer,
    IpFinder: IpFinder,
    ConfigLoader: ConfigLoader,
    BHapticsTactJsAdapter: BHapticsTactJsAdapter
}
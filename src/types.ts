/**
 * Inversify bindings.
 */
const TYPES = {
    App: Symbol.for('App'),
    Router: Symbol.for('Router'),

    ITemperatureAPI: Symbol.for('ITemperatureAPI'),
    IWindspeedAPI: Symbol.for('IWindspeedAPI'),

    IWeatherService: Symbol.for('IWeatherService'),

    IWeatherAPIController: Symbol.for('IWeatherAPIController')
};

export { TYPES };
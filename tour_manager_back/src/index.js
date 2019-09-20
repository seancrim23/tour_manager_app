import logMessage from './js/utils/logger'
import './css/style.css'
// Log message to console
logMessage('Welcome to Expack!') // eslint-disable-line no-undef

if(typeof(module.hot) !== 'undefined'){ // eslint-disable-line no-undef
    module.hot.accept(); // eslint-disable-line no-undef
}
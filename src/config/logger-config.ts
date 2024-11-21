import * as log4js from 'log4js';

log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'application.log' },
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'info' },
    },
});

const logger = log4js.getLogger();

export default logger;

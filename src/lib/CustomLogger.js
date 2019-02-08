/* eslint no-console: "off" */
import {
    bgBlue,
    blue,
    bgGreen,
    green,
    bgYellow,
    yellow,
    bgRed,
    red
} from 'colors/safe';

let loglevel = 1;

export default {
    'setLevel': function(newlevel) {
        loglevel = newlevel;
        if (loglevel === '0') {
            console.debug(bgBlue.black(' DEBUG '), bgGreen.black(' INFO  '),
                bgYellow.black(' WARN  '), bgRed.black(' ERROR '));
        }
    },
    'debug': function(msg, domain = 'Undefined') {
        if (loglevel >= 3) {
            console.debug(bgBlue.black(' DEBUG '), blue(`[${domain}] ${msg}`));
        }
    },
    'info': function(msg, domain = 'Undefined') {
        if (loglevel >= 2) {
            console.info(bgGreen.black(' INFO  '), green(`[${domain}] ${msg}`));
        }
    },
    'warn': function(msg, domain = 'Undefined') {
        if (loglevel >= 1) {
            return console.warn(bgYellow.black(' WARN  '), yellow(`[${domain}] ${msg}`));
        }
    },
    'error': function(msg, domain = 'Undefined') {
        if (loglevel >= 0) {
            return console.error(bgRed.black(' ERROR '), red(`[${domain}] ${msg}`));
        }
    }
};

import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import log from './lib/CustomLogger';
import logconst from './data/LogConst';
import logregx from './data/LogsRegex';

let logfiles = [],
    unzippedFiles = [],
    logfiledir = '',
    workdir = '',
    tmplogPath = '',
    latestlogDate = '',
    rawlogJSON = [];


let getDateFromFilename = function(filename) {
        // Expects YYYY-MM-DD-#.log
        // log.debug(`Creating timestamp from ${filename}`);
        let y = filename.split('-')[0],
            m = filename.split('-')[1],
            d = filename.split('-')[2],
            t = new Date(y, m - 1, d);
        
        if (filename === 'latest.log') {
            t = new Date();
        }

        // log.debug(`Created timestamp ${t.toISOString()}`);
        return t;
    },
    getTimestampFromHHMMSSAndBasedate = function(timeString, basedate) {
        // Expects [HH:MM:SS]
        // log.debug(`Creating timestamp from ${timeString}`);
        let h = timeString.split(':')[0],
            m = timeString.split(':')[1],
            s = timeString.split(':')[2],
            t = basedate;

        t.setSeconds(s);
        t.setMinutes(m);
        t.setHours(h);
        // log.debug(`Created timestamp ${t.toISOString()}`);
        return t.getTime();
    },
    getTimestampFromHHMMSSAndFilename = function(timeString, parentFilename) {
        // Expects [HH:MM:SS]
        let h = timeString.split(':')[0],
            m = timeString.split(':')[1],
            s = timeString.split(':')[2],
            t = getDateFromFilename(parentFilename);

        t.setSeconds(s);
        t.setMinutes(m);
        t.setHours(h);
        return t.getTime();
    },
    appendLogActionTo = function(dest, actionarray) {
        if (!actionarray) {
            return;
        }
        // log.debug(`Appending ${actionarray} to destination`);
        dest.push({
            'timestamp': actionarray[0],
            'type': actionarray[1],
            'description': actionarray[2],
            'severity': actionarray[3]
        });
    },
    parseLogLine = function(basedate, logline) {
        if (logline.match(logregx.timestampRE)) {
            // parse the time part of the lines
            let time = logline.match(logregx.timestampRE)[0];
            let timestamp = getTimestampFromHHMMSSAndBasedate(time, basedate);
            let sev = logline.match(logregx.severityRE) ? logline.match(logregx.severityRE)[1] : 'ERROR';

            if (logline.match(logregx.playerjoinRE)) {
                return [timestamp, logconst.TYPE_LOGIN, logline.match(logregx.playerjoinRE)[1], sev];
            } else if (logline.match(logregx.playerleftRE)) {
                return [timestamp, logconst.TYPE_LOGOFF, logline.match(logregx.playerleftRE)[1], sev];
            } else if (logline.match(logregx.advancementRE)) {
                return [timestamp, logconst.TYPE_ADVANCEMENT, logline.match(logregx.advancementRE)[1], sev];
            } else if (logline.match(logregx.playerchatRE)) {
                return [timestamp, logconst.TYPE_CHAT, {
                    'player': logline.match(logregx.playerchatRE)[1],
                    'chat': logline.substr(logline.indexOf('>') + 2)
                }, sev];
            } else if (logline.match(logregx.arrowdeathRE)) {
                return [timestamp, logconst.ARROW_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.cactusdeathRE)) {
                return [timestamp, logconst.CACTUS_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.waterdeathRE)) {
                return [timestamp, logconst.WATER_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.elytradeathRE)) {
                return [timestamp, logconst.ELYTRA_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.explosiondeathRE)) {
                return [timestamp, logconst.EXPLOSION_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.fallingdeathRE)) {
                return [timestamp, logconst.FALLING_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.anvildeathRE)) {
                return [timestamp, logconst.ANVIL_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.firedeathRE)) {
                return [timestamp, logconst.FIRE_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.fireworkdeathRE)) {
                return [timestamp, logconst.FIREWORK_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.lavadeathRE)) {
                return [timestamp, logconst.LAVA_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.lightningdeathRE)) {
                return [timestamp, logconst.LIGHTNING_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.magmadeathRE)) {
                return [timestamp, logconst.MAGMA_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.killeddeathRE)) {
                return [timestamp, logconst.KILLED_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.fireballRE)) {
                return [timestamp, logconst.FIREBALL_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.potiondeathRE)) {
                return [timestamp, logconst.POITION_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.starvedeathRE)) {
                return [timestamp, logconst.STARVE_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.suffocatedeathRE)) {
                return [timestamp, logconst.SUFFOCATE_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.thornsdeathRE)) {
                return [timestamp, logconst.THORNS_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.voiddeathRE)) {
                return [timestamp, logconst.VOID_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.witherdeathRE)) {
                return [timestamp, logconst.WITHER_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.bludgeondeathRE)) {
                return [timestamp, logconst.BLUDGEON_DEATH, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.uuiddescRE)) {
                return [timestamp, logconst.TYPE_PLAYERUUID, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.commandRE)) {
                return [timestamp, logconst.TYPE_COMMAND, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.serverreadyRE)) {
                return [timestamp, logconst.TYPE_SERVERREADY, logline.substr(logline.indexOf(']: ') + 3), sev];
            } else if (logline.match(logregx.serverstopRE)) {
                return [timestamp, logconst.TYPE_SERVERSTOP, logline.substr(logline.indexOf(']: ') + 3), sev];
            }
            return [timestamp, logconst.TYPE_SERVERINFO, logline.substr(logline.indexOf(']: ') + 3), sev];
    
        }
    },
    jsonFromLogfile = function(filepath) {
        log.debug(`Creating JSON for file ${ filepath }`);
        let createdJSON = [],
            createdDate = getDateFromFilename(filepath);
        const rl = readline.createInterface({
            'input': fs.createReadStream(path.join(logfiledir, filepath))
        });

        rl.on('line', (input) => {
            appendLogActionTo(createdJSON, parseLogLine(createdDate, input));
        });
        rl.on('close', () => {
            log.debug(`Completed parsing ${filepath}`);
            rawlogJSON.push(...createdJSON);
        });
    },
    jsonFromLogfilePromise = function(filepath) {
        return new Promise((resolve, reject) => {
            log.debug(`Creating JSON for file ${ filepath }`);
            let createdJSON = [],
                createdDate = getDateFromFilename(filepath);

            try {
                const rl = readline.createInterface({
                    'input': fs.createReadStream(path.join(logfiledir, filepath))
                });

                rl.on('line', (input) => {
                    appendLogActionTo(createdJSON, parseLogLine(createdDate, input));
                });
                rl.on('close', () => {
                    log.debug(`Completed parsing ${filepath}`);
                    rawlogJSON.push(...createdJSON);
                    resolve(filepath);
                });
            } catch (err) {
                reject(filepath, err);
            }
        });
    };

export default {
    'setDirs': function(logsdir, tempdir) {
        logfiledir = logsdir;
        latestlogDate = fs.statSync(path.join(logfiledir, 'latest.log')).mtime.toISOString();
        log.debug(`latest.log date: ${ latestlogDate }`);
        workdir = tempdir;
        tmplogPath = path.join(workdir, 'all_logs.json');
    },
    'prepareLogFiles': function() {
        let rawLogFiles = fs.readdirSync(logfiledir);

        log.debug(`Preparing following log files: ${ JSON.stringify(rawLogFiles) }`);
        // Go through the log dir and sort the files
        for (let i = 0; i < rawLogFiles.length; i++) {
            log.debug(`Working on file: ${ rawLogFiles[i] }`);
            // Unzip gziped files, keeeping track of them
            if (rawLogFiles[i].endsWith('.gz')) {
                log.debug('Detected gzip file.');
                let tmpLogFile = rawLogFiles[i].substr(0, rawLogFiles[i].length - 3),
                    compressedFile = fs.readFileSync(path.join(logfiledir, rawLogFiles[i])),
                    unzippedFile = zlib.unzipSync(compressedFile);

                log.debug('Unzipping file into log dir.');
                fs.writeFileSync(path.join(logfiledir, tmpLogFile), unzippedFile);

                unzippedFiles.push(tmpLogFile);
                logfiles.push(tmpLogFile);
                log.debug(`Unzipped ${tmpLogFile}`);
            } else if (rawLogFiles[i].endsWith('.log')) {
                logfiles.push(rawLogFiles[i]);
            }
        }
        logfiles = logfiles.sort();
        log.debug('Log file list sorted internally');
    },
    'combineLogFiles': function() {
        // Append all the files into one file
        log.debug('Clearing the temp.log file');
        fs.writeFileSync(tmplogPath, '');
        for (let i = 0; i < logfiles.length; i++) {
            // special case for latest.log, we want it to be the date instead
            let fileHeader = logfiles[i] === 'latest.log' ? `[Filedate:${latestlogDate}.log]\n` : `[Filename:${logfiles[i]}]\n`;
            
            log.debug(`Appending ${logfiles[i]} to temp.log.`);
            fs.appendFileSync(tmplogPath, fileHeader + fs.readFileSync(path.join(logfiledir, logfiles[i])));
        }
    },
    'parseLogFiles': function() {
        log.debug('Beginning parse of all log files.');
        let promises = [];

        for (let i = 0; i < logfiles.length; i++) {
            promises.push(jsonFromLogfilePromise(logfiles[i]));
        }
        log.info(`Began parse of ${logfiles.length} log files.`);
        Promise.all(promises).then((files) => {
            log.info(`Completed parsing ${files.length} log files.`);
            log.info(`Sorting ${rawlogJSON.length} records.`);
            rawlogJSON.sort((a, b) => {
                return a.timestamp - b.timestamp;
            });
            fs.writeFileSync(tmplogPath, JSON.stringify(rawlogJSON));
        });
    },
    rawlogJSON
};

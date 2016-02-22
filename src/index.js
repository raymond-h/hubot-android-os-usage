// Description
//   Useful Android OS usage info
//
// Commands:
//   hubot android (os|version) usage - shows android os version usage
//   hubot target which android version? - show which api level to target to cover 95% of user base
//   hubot target which android version to cover <percent>? - show which api level to target to cover the given percentage of user base
//
// Author:
//   https://github.com/raymond-h/

import 'babel-polyfill';
import { getVersionData, getApiToTarget } from './api';

module.exports = robot => {
    robot.respond(/android (?:os|version) usage/i, async (res) => {
        try {
            res.reply('Just a sec...');

            const data = await getVersionData();

            res.reply(
                data
                .map(ver => `API level ${ver.api} "${ver.name}" has a ${ver.percent}% usage!`)
                .join('\n') + '\n' +
                'The rest is less than 0.1%, so who cares?'
            );
        }
        catch(e) {
            res.reply('Oh no, an error happened!!');
            console.error(err.stack);
        }
    });

    robot.respond(/target which android version(?: to cover (\d+)%?)?\??/i, async (res) => {
        try {
            const perc = Number(res.match[1] || 95);

            if(perc <= 0 || perc > 100) {
                res.reply("That's a bit of a silly percentage to ask for, isn't it?");
                return;
            }

            res.reply('Lemme check...');

            const ver = await getApiToTarget(perc);

            res.reply(
                `API level ${ver.api} "${ver.name}" should be fine, ` +
                `it covers ${perc}% of users!`
            );
        }
        catch(e) {
            res.reply('Oh no, an error happened!!');
            console.error(err.stack);
        }
    });
};

/**
 * @author clemencedev
 * @version 1.0.0
 * @since 1.0.0
 */

// Import the discord.js class
const { Events } = require(`discord.js`);
// Import the configs
const { name } = require(`../package.json`);

module.exports = {
    name: Events.ClientReady,
    once: true,
    
    execute(client) {
        // Inform the user in the console that the bot is started
        console.log(`[${name}] ${client.user.tag} is ready to be used!`);
    },
};
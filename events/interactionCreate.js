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
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction) {
        // Check if the interaction is a command or not
        if(!interaction.isChatInputCommand()) 
            return;
        
        // Try to get the interaction command in the collection list
        const command = interaction.client.commands.get(interaction.commandName);

        // Check if the interaction command is not a command
        if(!command) {
            // Inform in the console of the error
            return console.error(`[${name}] There is no command: ${interaction.commandName}`);
        } else {
            // Try to execute the command
            try {
                await command.execute(interaction);
            } catch(error) {
                // Inform in the console and the user of the error
                console.error(`[${name}] There was an error executing "${interaction.commandName}" command!`);
                console.error(error);
                
                await interaction.reply({
                    content: `There was an error executing "${interaction.commandName}" command!`,
                    ephemeral: true
                });
            }
        }
    },
};
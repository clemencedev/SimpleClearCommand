/**
 * @author clemencedev
 * @version 1.0.0
 * @since 1.0.0
 */

// Import the discord.js class
const { 
    EmbedBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder
        } = require("discord.js");
// Import the configs
const { name } = require(`../package.json`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`clear`)
        .setDescription(`Clear between 1 and 99 messages in a channel.`)
        .addIntegerOption((option) =>
            option
                .setName(`number`)
                .setDescription(`The number of messages to delete between 1 and 99.`)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false),

    async execute(interaction) {
        // Get the number to delete
        let numberToDelete = interaction.options.getInteger(`number`);

        // Create the embed
        let embed = new EmbedBuilder();

        // Check if the number is valid
        if(numberToDelete < 1 || numberToDelete > 99) {
            embed
                .setColor([255, 0, 0])
                .setTitle(`:warning: Clear command`)
                .setDescription(`Please use a number between 1 and 99!`)
                .setTimestamp();

            // Reply to the interaction
            return interaction.reply({ embeds: [embed] }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply();
                }, 5000);
            });
        } else {
            // Try to delete the number of messages
            interaction.channel.bulkDelete(numberToDelete, true)
                .then(() => {
                    // Inform the console
                    console.log(`[${name}] ${interaction.user.tag} deleted ${numberToDelete} messages in channel: ${interaction.channel.name}`);

                    // Inform the user that the messages were deleted
                    embed
                        .setColor([0, 0, 255])
                        .setTitle(`:broom: Clear command`)
                        .setDescription(`\`${numberToDelete}\` messages were deleted!`)
                        .setTimestamp();

                    // Reply to the interaction
                    return interaction.reply({ embeds: [embed] }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply();
                        }, 5000);
                    });
                })
                .catch((error) => {
                    // Inform the console of the error
                    console.error(`[${name}] There was an error executing the clear command!`);
                    console.error(error);
                    
                    // Inform the user that there was an error
                    embed
                        .setColor([255, 0, 0])
                        .setTitle(`:warning: Clear command`)
                        .setDescription(`There was an error executing the clear command!`)
                        .setTimestamp();

                    // Reply to the interaction
                    return interaction.reply({ embeds: [embed] }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply();
                        }, 5000);
                    });
                });
        }
    },
};
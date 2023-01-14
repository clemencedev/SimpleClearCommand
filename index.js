/**
 * @author clemencedev
 * @version 1.0.0
 * @since 1.0.0
 */

// Import the discord.js classes
const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    REST,
    Routes
        } = require(`discord.js`);
// Import the other classes
const fs = require(`node:fs`);
const path = require(`node:path`);
// Import the configs
const { name } = require(`./package.json`);
const { 
    token,
    clientId
        } = require(`./config/token.json`);

// Create client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});

// Create the bot collections
client.commands = new Collection();

// Event handling
// Get all the events files
const eventsPath = path.join(__dirname, `/events`);
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(`.js`));

for(const file of eventFiles) {
    // Get individual events files
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    // Execute the event
    if(event.once) {
        client.once(
            event.name, 
            (...args) => event.execute(...args, client)
        );
    } else {
        client.on(
            event.name, 
            async (...args) => event.execute(...args, client)
        );
    }
}

// Command handling
// Get all the commands files
const commandsPath = path.join(__dirname, `/commands`);
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(`.js`));

for(const file of commandFiles) {
    // Get individual command files
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Put the command in the collection
    client.commands.set(command.data.name, command);
}

// Register the slash commands in Discord API
const rest = new REST({ version: `10` }).setToken(token);
const commandsInJson = Array.from(client.commands.values()).map((c) => c.data.toJSON());

(async () => {
    try {
        // Inform the user of the refreshing
        console.log(`[${name}] Started refreshing commnds!`);

        // Start the refresh
        await rest.put(
            // Global commands
            Routes.applicationCommands(clientId),

            // Send the commands
            { body: commandsInJson }
        );

        // Inform the user that the refreshing worked
        console.log(`[${name}] The commands successfully refreshed!`);
    } catch(error) {
        // Inform the user of the error
        console.log(`[${name}] An error occured!`);
        console.error(error);
    }
})();

// Log in to discord using the token
client.login(token);
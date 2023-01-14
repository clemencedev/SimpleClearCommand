# Simple clear command bot
A simple DiscordJS bot with a clear command.
 
### How to start the bot?
---
To execute this bot, you will need to have NodeJS installed, and a bot that you created.

Then you will need to modify the file `config/token.json` with your token and application ID:
```json
{
    "token": "YOUR-TOKEN",
    "clientId": "YOUR-CLIENT-ID"
}
```

After that, you can install the node modules and start the bot:
```
npm install
npm start
```

### How to use the command?
---

The command has a limit of 99 messages that you can delete at the same time. You also need the `MANAGE_MESSAGES` permissions to execute this command.

```
/clear [Number of message between 1 and 99]
```
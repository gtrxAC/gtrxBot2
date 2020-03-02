# gtrxBot²
Utility discord bot (discord.js) with image editing commands.
[Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=568738663572176916&permissions=8&scope=bot)
[Support Server](https://discord.gg/bRTPbpg)
[Icon Emotes](https://discord.gg/TVQdyea) - if you're self hosting, ask me to add your bot here!

## Commands
All commands must be prefixed with `gb`, for example `gbhelp`. You can change the prefix if you're self hosting.
Commands can be viewed using the `help` command.

## Self hosting
Required modules:

* discord.js (v12)
* canvas (for image editing commands)
* node-fetch - this comes with discord.js since v12, no need to install it.

1. Install [node.js](https://nodejs.org/) and git.
2. Make a new folder, name it something you can remember.
3. Open your terminal and install the modules. `npm install discordjs/discord.js canvas`
4. Create a [bot account](https://discordapp.com/developers/applications), if you haven't already.
5. Add your bot to a server, go to your app's page > OAuth2 > URL Generator > select "bot" and from the below list, choose "administrator". Copy the link to your browser and choose a server.
6. Get the token for your bot, go to your app's page > Bot > Click to reveal token.
7. Create a file called `config.json` and add the following content:

```json
{
    "token": "Your token here",
    "owner": "Your user ID here",
    "prefix": "Bot's prefix here, default is gb"
}
```
[Need help getting your ID?](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
8. Run `bot.js`.
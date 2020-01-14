# gtrxBot² (in development)
Utility discord bot (discord.js) with image editing commands.

## Commands
All commands must be prefixed with `gb`, for example `gbhelp`. You can change the prefix if self hosting.
Commands can be viewed using the `help` command.

### Utility commands
`embed <title>|[description]|[footer]|[color]`: Creates an embed message.
Example: `gbembed Embed Test|Lorem ipsum dolor sit amet|Note: I'm a footer|RED`
`color` must match [this](https://discord.js.org/#/docs/main/stable/typedef/ColorResolvable) definition.

`help [-p] [cmd]`: Shows available commands or info about one command.
-p: Shows help in the current channel instead of DMs.
cmd: Command to show info on.

`invite`: Gets the invite link for the bot (if you're self hosting, change the link to your own bot's link)

`nitro <emoji ...>`: Sends all the specified emoji, useful for sending nitro emoji without a subscription.
Example: `gbemoji hmm aPepeReee aYouTried`

`say <message ...>`: Sends a message as the bot account and deletes the command message.

### Fun commands
`kill [text/user]`: Kills the specified user in a random way. If no user is specified, it defaults to you.

`emoji`: Gets a random emoji from discordemoji.com and shows it. This command is NSFW, because some emoji are NSFW.

`sayas <user> <message ...>`: Says a command as a look-alike of another user, using webhooks.

### Image commands
All image commands operate on an attachment, image URL or the avatar of a mentioned user.
`gbsomeimagecommand http://link.to/image.png`
`gbsomeimagecommand @>gtrx<#6036`

Image commands are currently our main focus, so expect more image commands soon.

`iscale [image] <width> <height>`: Resizes an image.

### Owner only commands
`reload <command>`: Reloads a command file after it has been edited.

## Self hosting
Required modules:

* discord.js (v11)
* gm (for image editing commands)
* node-fetch (for emoji command, uses json)
* request (for image editing commands, uses stream/buffer)

1. Install [node.js](https://nodejs.org/) and [npm](http://npmjs.com).
2. Make a new folder, name it something you can remember.
3. Open terminal and install modules. `npm install discord.js gm node-fetch request`
4. Create a [bot account](https://discordapp.com/developers/applications), if you haven't already.
5. Add your bot to a server, go to your app's page > OAuth2 > URL Generator > select "bot" and from the below list, choose "administrator". Copy the link to your browser and choose a server.
6. Get the token for your bot, go to your app's page > Bot > Click to reveal token.
7. Create a file called `config.json` and add the following content:

```json
{
    "token": "Your token here",
    "owner": "Your ID here",
    "prefix": "Bot's prefix here, default is gb"
}
```
[Need help getting your ID?](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)

8. Run `bot.js`.
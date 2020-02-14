const Discord = require('discord.js');

module.exports = {
    // Creates an error message embed and sends it.
    // For this to work, the bot must have access to the icon emotes server https://discord.gg/TVQdyea

    // message: the command message that created the error
    // err: the error message
    async errorMessage(message, err) {
        const embed = new Discord.RichEmbed()
        .setColor(0x7289DA)
        .setTitle('<:mdError:568466408250408970> Error')
        .setDescription(`\`${err}\``)
        .setFooter(new Date().toISOString());
        const outMsg = await message.channel.send(embed);
        outMsg.delete(10000);
    },

    // Creates an embed template (doesn't send it).

    // title: the title for the embed, usually has an emoji at the start
    // desc: the embed description
    // footer: the bottom text of the embed, leave blank for the current date/time
    makeEmbed(title, desc, footer) {
        if (title == null || title == undefined) title == '';
        if (desc == null || desc == undefined) desc == '';
        if (footer == null || footer == undefined) footer = new Date().toISOString();
        const embed = new Discord.RichEmbed()
        .setColor(0x7289DA)
        .setTitle(title)
        .setDescription(`\`${desc}\``)
        .setFooter(footer);
        return embed;
    }
}

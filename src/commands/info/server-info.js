const { EmbedBuilder } = require("discord.js");

exports.run = (client, message, args) => {
  const embed = new EmbedBuilder();
  console.log(message.guild.members.cache.size);

  embed.setTitle(message.guild.name);
  embed.addFields(
    {
      name: "Member Count",
      value: message.guild.members.cache.size.toString(),
      inline: true,
    },
    {
      name: "Online Members",
      value: message.guild.members.cache
        .filter((member) => member.presence !== null)
        .size.toString(),
      inline: true,
    }
  );

  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "server-info",
  aliases: [],
  usage: `server-info`,
  guildOnly: true,
  category: "info",
  description: "Server info command",
};

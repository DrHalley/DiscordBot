const { EmbedBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");
exports.run = (client, message, args) => {
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
    return message.reply("Not enough permissions");
  if (args[0] == null) return message.reply("Invalid args");
  const member = message.mentions.users.first();
  if (member == null) return message.reply("Please mention a user");
  message.channel.permissionOverwrites.set([
    {
      id: member.id,
      deny: [PermissionsBitField.Flags.SendMessages],
    },
  ]);
  message.reply("User muted!");
};

exports.help = {
  name: "mute",
  aliases: [],
  usage: `mute @user`,
  guildOnly: true,
  category: "moderation",
  description: "Server mute command",
};

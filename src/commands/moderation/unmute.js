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
      allow: [PermissionsBitField.Flags.SendMessages],
    },
  ]);
  message.reply("User unmuted!");
};

exports.help = {
  name: "unmute",
  aliases: [],
  usage: `unmute @user`,
  guildOnly: true,
  category: "moderation",
  description: "Server unmute command",
};

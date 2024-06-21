const { EmbedBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");
exports.run = (client, message, args) => {
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
    return message.reply("Not enough permissions");
  if (args[0] == null) return message.reply("Invalid args");
  const member = message.mentions.users.first();
  const guildMember = message.guild.members.cache.find(
    (a) => a.id == member.id
  );
  if (member == null) return message.reply("Please mention a user");
  try {
    if (!guildMember.bannable) return message.reply("Cant ban that user!");
    guildMember.ban();
  } catch (err) {
    console.log(err);
    message.reply("Error happened");
  }
};

exports.help = {
  name: "ban",
  aliases: [],
  usage: `ban @user`,
  guildOnly: true,
  category: "moderation",
  description: "Server ban command",
};

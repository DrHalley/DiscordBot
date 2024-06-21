const { EmbedBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");
exports.run = (client, message, args, db) => {
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
    return message.reply("Not enough permissions");
  if (args[0] == null || args[1] == null) return message.reply("Invalid args");
  const role = message.mentions.roles.first();
  if (role == null) return message.reply("Mention a role");
  message.reply(
    "Succesfulyy created " + args[0] + " command for <@&" + role + "> role"
  );
  db.set(args[0], role.id);
};

exports.help = {
  name: "create-role-command",
  aliases: [],
  usage: `create-role-command command @user`,
  guildOnly: true,
  category: "info",
  description: "Server info command",
};

const {
  Client,
  Intents,
  Collection,
  GatewayIntentBits,
  Events,
} = require("discord.js");
const path = require("node:path");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});

const { Database } = require("npm.db");
const db = new Database("database");
const { token, welcomeChannel, rulesChannel } = require("../config.json");
const fs = require("fs");
client.commands = new Collection();

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

fs.readdir("./src/commands/", (err, folders) => {
  if (err) return console.error(err);
  folders.forEach((folder) => {
    fs.readdir(`./src/commands/${folder}/`, (e, files) => {
      files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${folder}/${file}`);
        let commandName = props.help.name;
        let commandAliases = props.help.aliases;
        if (commandAliases && commandAliases.length !== 0) {
          commandAliases.forEach((alias) => {
            client.commands.set(alias, props);
          });
        }
        console.log(`Loading command: ${commandName}`);
        client.commands.set(commandName, props);
      });
    });
  });
});
const { prefix } = require("../config.json");
const { Channel } = require("node:diagnostics_channel");
client.on(Events.MessageCreate, (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (db.get(commandName) != null) {
    try {
      const role = message.guild.roles.cache.find(
        (a) => a.id == db.get(commandName)
      );
      message.member.roles.add(role);
      message.reply(`You succesfully get the ${role} role`);
    } catch (err) {
      console.log(err);
      message.reply("error happened");
    }
  }
  const command = client.commands.get(commandName);
  if (!command) return;
  if (command.help.guildOnly) {
    if (!message.guild)
      return message.reply("Bu komut sadece sunucularda kullanılabiir");
  }
  command.run(client, message, args, db);
});

client.on(Events.GuildMemberAdd, (member) => {
  const channel = member.guild.channels.cache.find(
    (a) => (a.id = welcomeChannel)
  );
  const rules = member.guild.channels.cache.find((a) => (a.id = rulesChannel));
  channel.send(
    `Welcome ${member}. Read our rules from ${rules}. You can chat with your friends at #chat`
  );
});

client.login(token);

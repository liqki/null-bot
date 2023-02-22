require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { ReactionRole } = require("discordjs-reaction-role");
const token = process.env.CLIENT_TOKEN;
const fs = require("node:fs");
const path = require("node:path");
const reactionRoles = require("./reactionRoles.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
});

const manager = new ReactionRole(client, reactionRoles);

client.commands = new Collection();

// command handling
const readCommands = (dir) => {
  const files = fs.readdirSync(path.join(__dirname, dir));
  for (const file of files) {
    const stat = fs.lstatSync(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      readCommands(path.join(dir, file));
    } else if (file.endsWith(".js")) {
      const command = require(path.join(__dirname, dir, file));
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(`[WARNING] The command at ${path.join(__dirname, dir, file)} is missing a required "data" or "execute" property.`);
      }
    }
  }
};

readCommands("commands");

// event handling
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);

const destroy = () => {
  manager.teardown();
  client.destroy();
};
process.on("SIGINT", destroy);
process.on("SIGTERM", destroy);

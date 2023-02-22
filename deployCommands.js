require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];

const readCommands = (dir) => {
  const files = fs.readdirSync(path.join(__dirname, dir));
  for (const file of files) {
    const stat = fs.lstatSync(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      readCommands(path.join(dir, file));
    } else if (file.endsWith(".js")) {
      const command = require(path.join(__dirname, dir, file));
      commands.push(command.data.toJSON());
    }
  }
};

readCommands("./commands");

const rest = new REST({ version: "10" }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    console.log(`Reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

const { EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

const commands = [];
const categories = [];
const readCommands = (dir) => {
  const files = fs.readdirSync(path.join(__dirname, dir));
  for (const file of files) {
    const stat = fs.lstatSync(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      readCommands(path.join(dir, file));
    } else if (file.endsWith(".js")) {
      const command = require(path.join(__dirname, dir, file));
      command.category = dir;
      if (!categories.includes(dir) && dir !== ".") {
        categories.push(dir);
      }
      commands.push(command);
    }
  }
};

readCommands(".");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays all available commands!")
    .addStringOption((option) => option.setName("category").setDescription("The category of commands to display").setRequired(false)),
  async execute(interaction) {
    const category = interaction.options.getString("category");
    if (!category) {
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setThumbnail(interaction.client.user.avatarURL({ dynamic: true }))
        .setTitle("Client commands")
        .setDescription("Use </help:1077626528826925128> <category> to display all commands in a category!")
        .addFields(
          categories.map((category) => {
            return {
              name: category,
              value: "</help:1077626528826925128> " + category,
            };
          })
        )
        .setFooter({ text: "More commands coming soon!" });
      await interaction.reply({ embeds: [embed] });
      return;
    }
    if (!categories.includes(category) || category === ".") {
      await interaction.reply({ content: `No category matching ${category} was found!`, ephemeral: true });
      return;
    }
    const embed = new EmbedBuilder()
      .setColor("Green")
      .setThumbnail(interaction.client.user.avatarURL({ dynamic: true }))
      .setTitle(`List of all available commands in the category \`\`\`${category}\`\`\``)
      .addFields(
        commands
          .filter((command) => command.category === category)
          .map((command) => {
            return {
              name: command.data.name,
              value: command.data.description,
            };
          })
      )
      .setFooter({ text: "More commands coming soon!" });
    await interaction.reply({ embeds: [embed] });
  },
};

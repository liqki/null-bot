const { EmbedBuilder } = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("iq")
    .setDescription("Displays a user's iq (100% accurate)!")
    .addUserOption((option) => option.setName("user").setDescription("The user to display the iq of").setRequired(false)),
  async execute(interaction) {
    if (interaction.options.getUser("user")) return await interaction.reply(`${interaction.options.getUser("user")}'s iq is **${Math.floor(Math.random() * 200)}**!`);
    await interaction.reply(`${interaction.user}'s iq is **${Math.floor(Math.random() * 200)}**!`);
  },
};

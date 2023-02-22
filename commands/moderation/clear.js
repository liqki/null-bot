const { PermissionFlagsBits } = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the specified amount of messages!")
    .addIntegerOption((option) => option.setName("amount").setRequired(true).setMinValue(1).setMaxValue(100).setDescription("The amount of messages to delete!"))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    await interaction.channel.bulkDelete(amount);
    await interaction.reply({ content: `Successfully deleted ${amount} messages!`, ephemeral: true });
  },
};

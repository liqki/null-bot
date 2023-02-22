const { PermissionFlagsBits } = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a member from the server!")
    .addUserOption((option) => option.setName("member").setDescription("The member to kick").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const member = interaction.options.getMember("member");
    await member.kick();
    await interaction.reply({ content: `Successfully kicked ${member}!`, ephemeral: true });
  },
};

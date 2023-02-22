const { PermissionFlagsBits } = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a member from the server!")
    .addUserOption((option) => option.setName("member").setDescription("The member to ban").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const member = interaction.options.getMember("member");
    await member.ban();
    await interaction.reply({ content: `Successfully banned ${member}!`, ephemeral: true });
  },
};

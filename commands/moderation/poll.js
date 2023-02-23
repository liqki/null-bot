const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Creates a poll for members to vote on!")
    .addStringOption((option) => option.setName("question").setDescription("The question to vote on").setRequired(true))
    .addStringOption((option) => option.setName("option1").setDescription("The first option to vote on").setRequired(true))
    .addStringOption((option) => option.setName("option2").setDescription("The second option to vote on").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const question = interaction.options.getString("question");
    const option1 = interaction.options.getString("option1");
    const option2 = interaction.options.getString("option2");
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(question)
          .addFields({ name: "Option 1", value: ":one: " + option1, inline: true }, { name: "Option 2", value: ":two: " + option2, inline: true })
          .setColor("Random")
          .setTimestamp()
          .setFooter({ text: `Poll created by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() }),
      ],
    });
    const message = await interaction.fetchReply();
    await message.react("1️⃣");
    await message.react("2️⃣");
  },
};

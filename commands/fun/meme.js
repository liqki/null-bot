const { EmbedBuilder } = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder().setName("meme").setDescription("Displays a random meme from reddit!"),
  async execute(interaction) {
    const meme = await fetch("https://meme-api.com/gimme").then((response) => response.json());
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(meme.title)
      .setURL(meme.postLink)
      .setImage(meme.url)
      .setFooter({ text: `👍 ${meme.ups} | 💬 ${meme.subreddit}` });
    await interaction.reply({ embeds: [embed] });
  },
};

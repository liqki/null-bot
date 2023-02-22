const { EmbedBuilder } = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder().setName("fox").setDescription("Displays a cute image of a fox🦊!"),
  async execute(interaction) {
    const fox = await fetch("https://randomfox.ca/floof/").then((response) => response.json());
    const embed = new EmbedBuilder().setColor("Random").setTitle("Awww, look at this cute fox!").setURL("https://randomfox.ca/").setImage(fox.image).setFooter({ text: "Powered by randomfox.ca" });
    await interaction.reply({ embeds: [embed] });
  },
};

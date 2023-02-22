const { EmbedBuilder } = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder().setName("dog").setDescription("Displays a cute image of a dog🐶!"),
  async execute(interaction) {
    const dog = await fetch("https://dog.ceo/api/breeds/image/random").then((response) => response.json());
    const embed = new EmbedBuilder().setColor("Random").setTitle("Awww, look at this cute dog!").setURL("https://dog.ceo/dog-api/").setImage(dog.message).setFooter({ text: "Powered by dog.ceo" });
    await interaction.reply({ embeds: [embed] });
  },
};

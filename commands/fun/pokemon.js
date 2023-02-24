const { EmbedBuilder } = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("Displays information about the specified pokemon!")
    .addStringOption((option) => option.setName("pokemon").setDescription("The name of the pokemon").setRequired(true)),
  async execute(interaction) {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + interaction.options.getString("pokemon").toLowerCase())
      .then((res) => res.json())
      .catch(() => {
        return interaction.reply({ content: "This pokemon doesn't exist! Please note that only english names will work!", ephemeral: true });
      });
    if (!res.name) return;
    const embed = new EmbedBuilder()
      .setTitle(res.name.charAt(0).toUpperCase() + res.name.slice(1))
      .setThumbnail(res.sprites.front_default)
      .addFields(
        { name: "Type", value: res.types.map((type) => type.type.name).join(", ") },
        { name: "Height", value: res.height / 10 + "m" },
        { name: "Weight", value: res.weight / 10 + "kg" },
        { name: "Abilities", value: res.abilities.map((ability) => ability.ability.name).join(", ") }
      )
      .setColor("Random")
      .setFooter({ text: "Powered by pokeapi.co" });
    interaction.reply({ embeds: [embed] });
  },
};

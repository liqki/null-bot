const { Events, EmbedBuilder } = require("discord.js");
const mcs = require("node-mcstatus");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;
    if (message.author.id !== process.env.OWNER_ID) return;
    if (message.content === "!serverstatus") {
      const host = "liqkismp.feathermc.gg";
      const embed = new EmbedBuilder().setTitle("Checking server status...");
      message.channel.send({ embeds: [embed] }).then((msg) => {
        setInterval(() => {
          mcs
            .statusJava(host)
            .then((res) => {
              const { online, players, version, icon } = res;
              console.log(online, players, version);
              const embed = new EmbedBuilder()
                .setTitle("Server Status")
                .addFields({ name: "Online", value: online ? "yes" : "no" }, { name: "Players", value: players.online + "/" + players.max }, { name: "Version", value: version.name_clean })
                .setThumbnail(icon)
                .setColor(online ? "Green" : "Red");
              msg.edit({ embeds: [embed] });
            })
            .catch((err) => {
              console.log(err);
            });
        }, 10000);
      });
    }
  },
};

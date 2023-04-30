const { Events, EmbedBuilder } = require("discord.js");
const mcs = require("node-mcstatus");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;
    if (message.author.id !== process.env.OWNER_ID) return;
    if (message.mentions.users.first().id === process.env.CLIENT_ID && message.content.length === 22) {
      message.channel.send("did I just hear my name? :flushed:");
    }
    if (message.content === "!serverstatus") {
      const host = "liqkismp.feathermc.gg";
      const embed = new EmbedBuilder().setTitle("Checking server status...");
      message.channel.send({ embeds: [embed] }).then((msg) => {
        setInterval(() => {
          
        mcs
          .statusJava(host)
          .then((res) => {
            const { online, players, version, icon } = res;
            const embed = new EmbedBuilder()
              .setTitle("Server Status")
              .addFields({ name: "Online", value: online }, { name: "Players", value: players.online + "/" + players.max }, { name: "Version", value: version.name_clean })
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

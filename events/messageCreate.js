const { Events, EmbedBuilder, AttachmentBuilder } = require("discord.js");
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
              const embed = new EmbedBuilder()
                .setTitle("Server Status")
                .addFields(
                  { name: "Online", value: online ? "yes (" + host + ")" : "no" },
                  { name: "Players", value: players.online + "/" + players.max },
                  { name: "Version", value: version.name_clean }
                )
                .setThumbnail("https://img.itch.zone/aW1nLzM2MjgwMDAuZ2lm/315x250%23cm/qzKdcP.gif")
                .setColor(online ? "Green" : "Red");
              msg.edit({ embeds: [embed] });
            })
            .catch((err) => {
              console.log(err);
            });
        }, 5000);
      });
    }
  },
};

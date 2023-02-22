const { Events, ActivityType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setActivity("/help", { type: ActivityType.Playing });
    // const rolesChannel = client.guilds.cache.get(process.env.GUILD_ID).channels.cache.get("1077321805607477340");
    // rolesChannel.messages.fetch().then((messages) => {
    //   if (messages.size !== 0) return;
    //   const embed = new EmbedBuilder().setColor("Green").setTitle("Reaction Roles").setDescription("React to this message to get the corresponding role!");
    //   rolesChannel.send({ embeds: [embed] }).then((message) => {
    //     message.react("<:cpp:1076612140716261406>");
    //     message.react("<:css:1076612159406096504>");
    //     message.react("<:html:1076612179693936821>");
    //     message.react("<:java:1076612190267781120>");
    //     message.react("<:javascript:1076612201458180096>");
    //     message.react("<:python:1076612211700678767>");
    //     message.react("<:react:1076612221611815002>");
    //     message.react("<:swift:1076612230910582875>");
    //   });
    // });
  },
};

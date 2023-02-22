const { Events } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    member.roles.add("968560565192646776");
    const welcomeChannel = member.guild.channels.cache.get("968551416031510548");
    if (!welcomeChannel) return;
    welcomeChannel.send(`Welcome to the server, ${member}!`);
  },
};

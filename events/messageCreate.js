const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;
    if (message.author.id !== process.env.OWNER_ID) return;
    if (message.mentions.users.first().id === process.env.CLIENT_ID && message.content.length === 22) {
      message.channel.send("did I just hear my name? :flushed:");
    }
  },
};

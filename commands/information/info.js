const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get information about the server or a member!")
    .addSubcommand((subCommand) => subCommand.setName("server").setDescription("Get information about the server!"))
    .addSubcommand((subCommand) =>
      subCommand
        .setName("member")
        .setDescription("Get information about a member!")
        .addUserOption((option) => option.setName("member").setDescription("Specify a member!").setRequired(true))
    ),
  async execute(interaction) {
    const uptime = moment.duration(interaction.client.uptime, "milliseconds");
    switch (interaction.options.getSubcommand()) {
      case "server": {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`Information about the server ${interaction.guild.name}`)
              .setColor("Aqua")
              .addFields([
                {
                  name: "Channels",
                  value: `${interaction.guild.channels.cache.size} Channels`,
                },
                {
                  name: "Created at",
                  value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`,
                  inline: true,
                },
              ]),
          ],
        });
        break;
      }
      case "member": {
        const member = interaction.options.getMember("member");
        const isClient = member.user.id === process.env.CLIENT_ID;
        interaction.reply({
          embeds: [
            !isClient
              ? new EmbedBuilder()
                  .setTitle(`Information about the member ${member.user.tag}`)
                  .setColor("Green")
                  .setThumbnail(member.user.avatarURL({ dynamic: true }))
                  .addFields([
                    {
                      name: "Account created at",
                      value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`,
                    },
                    {
                      name: "Joined server at",
                      value: `<t:${Math.round(member.joinedTimestamp / 1000)}>`,
                      inline: true,
                    },
                    {
                      name: "Roles",
                      value: `<@&${member._roles.join("> <@&")}>`,
                    },
                  ])
              : new EmbedBuilder()
                  .setTitle("Infomation about me")
                  .setColor("Green")
                  .setThumbnail(member.user.avatarURL({ dynamic: true }))
                  .addFields([
                    {
                      name: "Controlling the server since",
                      value: `<t:${Math.round(member.joinedTimestamp / 1000)}>`,
                    },
                    {
                      name: "Uptime",
                      value: `${uptime.days()} days, ${uptime.hours()} hours, ${uptime.minutes()} minutes and ${uptime.seconds()} seconds`,
                    },
                    {
                      name: "Command count",
                      value: `${interaction.client.commands.size} commands`,
                    },
                    {
                      name: "Created by",
                      value: `<@${process.env.OWNER_ID}>`,
                    },
                  ]),
          ],
        });
        break;
      }
    }
  },
};

import {
    SlashCommandBuilder,
    CommandInteraction,
    Client,
    EmbedBuilder,
    Colors,
} from "discord.js";
import { SlashCommand } from "../../utils/schemas";
import messages from "../../utils/messages";

class PingCommand extends SlashCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("ping")
                .setDescription("Get the bot's latency.")
        );
    }

    async run(client: Client, interaction: CommandInteraction) {
        let pinging = messages.info().setDescription("Pinging...");

        let api = client.ws.ping;

        let message = await interaction.reply({
            embeds: [pinging],
            ephemeral: true,
        });

        let ping = Date.now() - message.createdTimestamp;

        return await message.edit({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Pong!")
                    .setColor(Colors.Purple)
                    .setDescription("Here are the results of the ping test:")
                    .addFields([
                        {
                            name: ":door: Gateway Ping",
                            value: `${api}ms`,
                            inline: true,
                        },
                        {
                            name: ":satellite: API Ping",
                            value: `${ping}ms`,
                            inline: true,
                        },
                        {
                            name: ":stopwatch: Total",
                            value: `${api + ping}ms`,
                            inline: true,
                        },
                    ])
                    .setFooter({
                        text: `Requested by ${interaction.user.globalName} (${interaction.user.username} | ${interaction.user.id})`,
                        iconURL: interaction.user.avatarURL()
                            ? interaction.user.avatarURL()!
                            : interaction.user.defaultAvatarURL,
                    }),
            ],
        });
    }
}

export default () => new PingCommand();

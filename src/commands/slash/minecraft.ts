import {
    SlashCommandBuilder,
    CommandInteraction,
    Client,
    EmbedBuilder,
    Colors,
    CacheType,
    InteractionResponse,
    Message,
    TimestampStyles,
} from "discord.js";
import { Command } from "../../utils/schemas";
import messages from "../../utils/messages";

class MinecraftCommand extends Command {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("minecraft")
                .setDescription("Get a minecraft player's profile")
                .addStringOption((option) =>
                    option
                        .setName("username")
                        .setDescription("The minecraft username to look up")
                        .setRequired(true)
                )
                .setNSFW(false)
        );
    }

    async run(
        _: Client<boolean>,
        interaction: CommandInteraction<CacheType>
    ): Promise<InteractionResponse<boolean> | Message<boolean>> {
        await interaction.deferReply({
            ephemeral: false,
        });
        const searched = interaction.options.get("username")?.value as string;
        let json;

        let error;

        await fetch(`https://api.crafty.gg/api/v2/players?search=${searched}`)
            .then((res) => (json = res.json()))
            .catch((err) => (error = err));

        if (error) {
            throw new Error(error);
        }

        if (!json) {
            throw new Error("response was null, but no error was thrown");
        }

        json = await json;

        if (!json["success"]) {
            const notfound = messages
                .error()
                .setDescription(
                    `There was no minecraft user found with the username **${searched}**`
                );

            return await interaction.followUp({
                ephemeral: false,
                embeds: [notfound],
            });
        }

        const data = json["data"];

        const username = data["username"];
        const uuid = data["uuid"];

        let names: any[] = data["usernames"];

        let usernames = "";
        let count = 0;

        for (const nameData of names) {
            const name = nameData["username"];
            const date = Math.floor(Date.parse(nameData["changed_at"]) / 1000);

            const changedAt = `<t:${date}:${TimestampStyles.LongDate}>`;
            const changedAgo = `<t:${date}:${TimestampStyles.RelativeTime}>`;

            if (count > 0) usernames += "\n";

            count++;
            usernames += `\`${name}\` - ${changedAt}, ${changedAgo}`;
        }

        const reply = new EmbedBuilder()
            .setColor(Colors.Purple)
            .setTitle(`Minecraft profile for **${username}**`)
            .setThumbnail(
                `https://starlightskins.lunareclipse.studio/skin-render/isometric/${uuid}/face`
            )
            .addFields([
                {
                    name: ":jigsaw: Unique ID",
                    value: `\`${uuid}\``,
                    inline: false,
                },
                {
                    name: ":shirt: Textures",
                    value:
                        `Skin: [Render](https://starlightskins.lunareclipse.studio/skin-render/isometric/${uuid}/full) ([Raw skin](https://starlightskins.lunareclipse.studio/skin-render/skin/${uuid}/processed))` +
                        "\n" +
                        `Cape: [Raw cape](https://crafatar.com/capes/${uuid})`,
                    inline: false,
                },
                {
                    name: ":stopwatch: Usernames",
                    value: usernames,
                    inline: false,
                },
            ])
            .setFooter({
                text: `Requested by ${interaction.user.globalName} (${interaction.user.username} | ${interaction.user.id})`,
                iconURL: interaction.user.avatarURL()
                    ? interaction.user.avatarURL()!
                    : interaction.user.defaultAvatarURL,
            });

        return await interaction.followUp({
            ephemeral: false,
            embeds: [reply],
        });
    }
}

export default () => new MinecraftCommand();

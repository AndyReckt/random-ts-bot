import {
    CommandInteraction,
    GuildMember,
    REST,
    RESTPostAPIApplicationCommandsJSONBody,
    Routes,
} from "discord.js";
import messages from "../utils/messages";
import { getFilesInDir } from "../utils/fileUtil";
import path from "path";
import { Command, RClient } from "../utils/schemas";

const folder = __dirname + "/../commands/slash";

const loadSlashCommands = (client: RClient) => {
    getFilesInDir(folder).forEach((file) => {
        const filePath = path.join(folder, file);

        if (file.endsWith(".js")) {
            try {
                const module = require(filePath);
                if (module.default() && module.default() instanceof Command) {
                    let command: Command = module.default();
                    client.commands.set(command.name(), command);
                }
            } catch (error) {
                console.error(`Error while loading ${file}: ${error}`);
            }
        }
    });
};
const refreshSlashCommands = async (client: RClient) => {
    const rest = new REST().setToken(process.env.TOKEN!);

    try {
        console.log(
            `Started refreshing ${client.commands.size} application (/) commands.`
        );

        let jsonArray: RESTPostAPIApplicationCommandsJSONBody[] = [];

        for (let [_, value] of client.commands) {
            jsonArray.push(value.command.toJSON());
        }

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENTID!,
                process.env.GUILDID!
            ),
            { body: jsonArray }
        );

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
};

export async function initializeCommands(client: RClient) {
    loadSlashCommands(client);
    await refreshSlashCommands(client);
}

/**
 * Handles the command
 * @param client Custom client
 * @param interaction Command interaction
 */
export async function handleCommand(
    client: RClient,
    interaction: CommandInteraction
) {
    // await interaction.deferReply();

    const { commandName } = interaction;
    const command = client.commands.get(commandName);

    if (!command) {
        return await interaction.reply({
            ephemeral: true,
            embeds: [messages.error().setDescription("Command not found.")],
        });
    }

    if (
        (command.permissions &&
            command.permissions.some(
                (p) => !(interaction.member as GuildMember).permissions.has(p)
            )) ||
        (command.roleOnly &&
            !(interaction.member as GuildMember).roles.cache.some(
                (role) => role.id == command.roleOnly
            ))

        //&& !client.developers.includes(interaction.user.id)
    )
        return await interaction.reply({
            ephemeral: true,
            embeds: [
                messages
                    .error()
                    .setDescription(
                        "You do not have permission to run this command."
                    ),
            ],
        });

    try {
        await command.run(client, interaction);
    } catch (error) {
        console.error(
            `An error occurred in '${command.name()}' command.\n${error}\n`
        );

        return await interaction.reply({
            ephemeral: true,
            embeds: [
                messages
                    .error()
                    .setDescription(
                        "An error occurred, please try again later."
                    ),
            ],
        });
    }
}

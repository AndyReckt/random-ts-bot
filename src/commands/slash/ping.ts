import {
    SlashCommandBuilder,
    CommandInteraction,
    InteractionResponse,
    Client,
    Message,
} from "discord.js";
import { Command } from "../../utils/schemas";

class PingCommand extends Command {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("ping")
                .setDescription("Replies with Pong!")
        );
    }

    async run(client: Client, interaction: CommandInteraction) {
        return await interaction.followUp({
            content: "Pong!",
            ephemeral: true,
        });
    }
}

export default () => new PingCommand();

import { Client, Events } from "discord.js";
import { Listener, RClient } from "../utils/schemas";
import { handleSlashCommand } from "../handlers/commandHandler";

class CommandListener extends Listener {
    listen(): void {
        this.client.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isChatInputCommand()) return;
            handleSlashCommand(interaction.client as RClient, interaction);
        });
    }
}

export default (client: Client): CommandListener => {
    return new CommandListener(client);
};

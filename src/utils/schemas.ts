import {
    Client,
    Collection,
    CommandInteraction,
    InteractionResponse,
    Message,
    PermissionResolvable,
    SlashCommandBuilder,
} from "discord.js";

export class RClient extends Client {
    commands = new Collection<string, Command>();
}

export abstract class Listener {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    abstract listen(): void;
}

export abstract class Command {
    command: SlashCommandBuilder;
    permissions: PermissionResolvable[] | undefined;
    roleOnly: string | undefined;

    constructor(command: SlashCommandBuilder) {
        this.command = command;
    }

    abstract run(
        client: Client,
        interaction: CommandInteraction
    ): Promise<InteractionResponse | Message>;

    /**
     * name
     */
    public name(): string {
        return this.command.name;
    }

    /**
     * description
     */
    public description() {
        return this.command.description;
    }

    /**
     * nsfw
     */
    public nsfw() {
        return this.command.nsfw;
    }

    /**
     * addPermission
     */
    public addPermission(permission: PermissionResolvable) {
        if (!this.permissions) this.permissions = [];
        this.permissions.push(permission);
    }
}

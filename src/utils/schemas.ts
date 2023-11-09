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
    messageCommands = new Collection<string, MessageCommand>();
    slashCommands = new Collection<string, SlashCommand>();
}

export abstract class Listener {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    abstract listen(): void;
}

export abstract class Command {
    permissions: PermissionResolvable[] | undefined;
    roleOnly: string | undefined;

    constructor() {}

    abstract run(client: Client, interaction: any): any;

    /**
     * name
     */
    abstract name(): string;

    /**
     * description
     */
    abstract description(): string;

    /**
     * nsfw
     */
    abstract nsfw(): boolean;

    /**
     * addPermission
     */
    public addPermission(permission: PermissionResolvable) {
        if (!this.permissions) this.permissions = [];
        this.permissions.push(permission);
    }
}

export abstract class MessageCommand extends Command {
    constructor() {
        super();
    }

    abstract run(client: Client, interaction: Message): any;

    abstract helpCategory(): string;
}

export abstract class SlashCommand extends Command {
    command: SlashCommandBuilder;

    constructor(command: SlashCommandBuilder) {
        super();
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
    public description(): string {
        return this.command.description;
    }

    /**
     * nsfw
     */
    public nsfw() {
        if (this.command.nsfw) {
            return this.command.nsfw;
        }
        return false;
    }
}

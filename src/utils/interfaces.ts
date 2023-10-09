import { Client } from "discord.js";

export abstract class Listener {
	abstract listen(client: Client): void;
}

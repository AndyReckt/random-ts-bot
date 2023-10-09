import { Client } from "discord.js";

export abstract class Listener {
	client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	abstract listen(): void;
}

import { Client, Events, GatewayIntentBits } from "discord.js";

import dotenv from "dotenv";
import listenerHandler from "handlers/listenerHandler";

dotenv.config();

let allIntents: number[] = [];
Object.keys(GatewayIntentBits)
	.map((it) => Number.parseInt(it))
	.forEach((it) => allIntents.push(it));

const client = new Client({
	intents: allIntents,
});

listenerHandler(client);

client.login(process.env.TOKEN);

exports = {
	client,
};

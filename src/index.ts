import { Client, Events, GatewayIntentBits } from "discord.js";

import dotenv from "dotenv";
import listenerHandler from "./handlers/listenerHandler";

dotenv.config();

let allIntents: number[] = [];
Object.keys(GatewayIntentBits)
	.map((it) => Number.parseInt(it))
	.filter((it) => !isNaN(it))
	.forEach((it) => allIntents.push(it));

const client = new Client({
	intents: allIntents,
});

console.log("Starting bot...");
client.login(process.env.TOKEN);

listenerHandler(client);

exports = {
	client,
};

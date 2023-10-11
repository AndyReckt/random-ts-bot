import { GatewayIntentBits } from "discord.js";

import dotenv from "dotenv";
import listenerHandler from "./handlers/listenerHandler";
import { RClient } from "./utils/schemas";
import { initializeCommands } from "./handlers/commandHandler";

dotenv.config();

let allIntents: number[] = [];
Object.keys(GatewayIntentBits)
    .map((it) => Number.parseInt(it))
    .filter((it) => !isNaN(it))
    .forEach((it) => allIntents.push(it));

const client = new RClient({
    intents: allIntents,
});

console.log("Starting bot...");
client.login(process.env.TOKEN);

listenerHandler(client);
initializeCommands(client);

exports = {
    client,
};

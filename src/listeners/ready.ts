import { Client, Events } from "discord.js";
import { Listener } from "../utils/schemas";

class ReadyListener extends Listener {
    listen(): void {
        this.client.on(Events.ClientReady, (bot) =>
            console.log(`Ready! Logged in as ${bot.user.tag}`)
        );
    }
}

export default (client: Client): ReadyListener => {
    return new ReadyListener(client);
};

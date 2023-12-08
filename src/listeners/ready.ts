import { Client, Events } from "discord.js";
import { Listener } from "../utils/schemas";

class ReadyListener extends Listener {
    listen(): void {
        this.client.on(Events.ClientReady, (bot) =>
            console.log(`Ready! Logged in as ${bot.user.tag}`)
        );
    }
}

let listener: ReadyListener;

export default (client: Client): ReadyListener => {
    if (listener) {
        return listener;
    } else {
        listener = new ReadyListener(client);
        return listener;
    }
};

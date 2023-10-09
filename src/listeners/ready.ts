import { Client, Events } from "discord.js";
import { Listener } from "utils/interfaces";

class ReadyListener implements Listener {
	listen(client: Client): void {
		client.on(Events.ClientReady, (bot) =>
			console.log(`Ready! Logged in as ${bot.user.tag}`)
		);
	}
}

export default (client: Client): ReadyListener => {
	return new ReadyListener();
};

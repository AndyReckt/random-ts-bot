import { Client } from "discord.js";
import path from "path";
import { getFilesInDir } from "utils/fileUtil";
import { Listener } from "utils/interfaces";

const folder = "../listeners/";

export default (client: Client) => {
	getFilesInDir(folder).forEach((file) => {
		const filePath = path.join(folder, file);

		if (file.endsWith(".ts")) {
			try {
				const module = require(filePath);
				if (module.default && module.default instanceof Listener) {
					module.default(client);
				}
			} catch (error) {
				console.error(`Error while loading ${file}: ${error}`);
			}
		}
	});
};

import { Client } from "discord.js";
import path from "path";
import { getFilesInDir } from "../utils/fileUtil";
import { Listener } from "../utils/schemas";

const folder = __dirname + "/../listeners/";

export default (client: Client) => {
    getFilesInDir(folder).forEach((file) => {
        const filePath = path.join(folder, file);

        if (file.endsWith(".js") || file.endsWith(".ts")) {
            try {
                const module = require(filePath);
                if (
                    module.default(client) &&
                    module.default(client) instanceof Listener
                ) {
                    let listener: Listener = module.default(client);
                    listener.listen();
                }
            } catch (error) {
                console.error(`Error while loading ${file}: ${error}`);
            }
        }
    });
};

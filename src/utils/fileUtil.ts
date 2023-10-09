import { lstatSync, readdirSync } from "fs";

export function getFilesInDir(path: string): string[] {
	let files: string[] = [];

	readdirSync(path).forEach((file) => {
		if (lstatSync(file).isDirectory()) {
			getFilesInDir(path).forEach((it) => files.push(it));
		} else {
			files.push(file);
		}
	});

	return files;
}

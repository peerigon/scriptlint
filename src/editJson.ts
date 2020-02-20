import fs from "fs";
import { Indent } from "detect-indent";
import { PackageFile } from "./types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const detectIndent = require("detect-indent");

export default class {
	path: string;
	indent: Indent;
	package: PackageFile;
	fileContents?: string;

	constructor(path: string) {
		this.path = path;
		this.fileContents = fs.readFileSync(path, "utf-8");
		const fileParsed = JSON.parse(this.fileContents);

		if(!fileParsed.scripts) {
			fileParsed.scripts = {};
		}
		
		this.package = fileParsed;
		this.indent = detectIndent(this.fileContents);
	}

	get(): PackageFile {
		return this.package;
	}

	set(path: string, content: Record<string, unknown>) {
		this.package[path] = content;

		return this;
	}

	save() {
		const json = JSON.stringify(this.package, null, this.indent.indent);

		return fs.writeFileSync(this.path, json);
	}
}

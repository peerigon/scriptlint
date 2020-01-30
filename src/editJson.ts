import fs from "fs";
import detectIndent, {Indent} from "detect-indent";
import {PackageFile} from "./types";

class EditJson {
	path: string;
	indent: Indent;
	package: PackageFile;
	fileContents?: string;

	constructor(path: string) {
		this.path = path;
		this.fileContents = fs.readFileSync(path, "utf-8");
		this.package = JSON.parse(this.fileContents);
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
		const json = JSON.stringify(
			this.package,
			null,
			this.indent.indent
		);

		return fs.writeFileSync(this.path, json);
	}
}

export default (path: string) => {
	return new EditJson(path);
};

import { PackageScripts } from "../types";
import { objectFromEntries } from "../utils";

type EntryInfo = {
	order: number;
	namespace: string;
	entry: [string, string];
};

const prepareEntryInfo = (entry: [string, string]) => {
	const name = entry[0];
	const namespace = name.split(":")[0];

	if (name.startsWith("pre")) {
		return {
			order: 0,
			namespace: namespace.substr(3),
			entry,
		};
	}
	if (name.startsWith("post")) {
		return {
			order: 2,
			namespace: namespace.substr(4),
			entry,
		};
	}

	return {
		order: 1,
		namespace,
		entry,
	};
};

export const sortScripts = (scripts: PackageScripts): PackageScripts => {
	// prepare namespace and order info
	const entries = Object.entries(scripts).map(prepareEntryInfo);

	return objectFromEntries(
		entries
			// make unique namespace groups
			.map((e: EntryInfo) => e.namespace)
			.filter(
				(name: string, i: number, a: Array<string>) =>
					a.indexOf(name) === i
			)
			.sort()
			.map((name: string) =>
				entries.filter((e: EntryInfo) => e.namespace === name)
			)
			// sort inside the group
			.map((group: Array<EntryInfo>) =>
				// sort `1-title` vs `2-title` etc.
				group.sort((a: EntryInfo, b: EntryInfo) =>
					`${a.order}-${a.entry[0]}`.localeCompare(
						`${b.order}-${b.entry[0]}`
					)
				)
			)
			// flatten array
			.reduce(
				(flatted: Array<EntryInfo>, group: Array<EntryInfo>) => [
					...flatted,
					...group,
				],
				[]
			)
			// reduce to entries again
			.map((f: EntryInfo) => f.entry)
	);
};

export default {
	name: "natural-order",
	isObjectRule: true,
	message: "scripts must be in 'natural' order",
	validate: (scripts: PackageScripts) => {
		const sorted = sortScripts(scripts);

		return Object.keys(sorted).join("|") === Object.keys(scripts).join("|");
	},
	fix: (scripts: PackageScripts) => sortScripts(scripts),
};

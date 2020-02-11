#!/usr/bin/env node
import scriptlint from "./main";
import {error} from "./consoleReporter";

try {
	scriptlint(
		{
			json: false,
		},
		"cli"
	);
} catch (err) {
	error(err);
}

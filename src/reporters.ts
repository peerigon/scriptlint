import consoleReporter from "./consoleReporter";
import jsonReporter from "./jsonReporter";

export default (type: "console.log" | "json") => {
	return type === "console.log" ? consoleReporter : jsonReporter;
};

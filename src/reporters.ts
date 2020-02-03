import cliReporter from "./cliReporter";
import jsonReporter from "./jsonReporter";

export default (type: "cli" | "json") => {
	return type === "cli" ? cliReporter : jsonReporter;
};

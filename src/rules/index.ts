import makeMandatory from "./mandatoryScriptFactory";
import makeForbidUnixOperators from "./noShellSpecificsFactory";
import noDefaultTest from "./no-default-test";
import correctCasing from "./correct-casing";
import noAliases from "./no-aliases";
import prePostTriggerDefined from "./prepost-trigger-defined";
import usesAllowedNamespace from "./uses-allowed-namespace";
import alphabeticOrder from "./alphabetic-order";
import { Rule } from "../types";

const rules: Array<Rule> = [
	makeMandatory("test"),
	makeMandatory("start"),
	makeMandatory("dev"),
	noDefaultTest,
	correctCasing,
	noAliases,
	usesAllowedNamespace,
	prePostTriggerDefined,
	alphabeticOrder,
	makeForbidUnixOperators(/rm /, "rm -rf", "rimraf"),
	makeForbidUnixOperators(
		/ && /,
		"unix double ampersand (&&)",
		"npm-run-all/run-s"
	),
	makeForbidUnixOperators(
		/ & /,
		"unix single ampersand (&)",
		"npm-run-all/run-p"
	),
];

export default rules;
